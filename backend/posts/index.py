"""Управление постами блога: получение, создание, редактирование, удаление. Авторизация по паролю."""
import json
import os
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Author-Password',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def schema():
    return os.environ['MAIN_DB_SCHEMA']

def check_auth(headers: dict) -> bool:
    password = os.environ.get('AUTHOR_PASSWORD', '')
    provided = headers.get('x-author-password') or headers.get('X-Author-Password', '')
    return password and provided == password

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    method = event.get('httpMethod', 'GET')
    params = event.get('queryStringParameters') or {}
    headers = event.get('headers') or {}

    # GET /  — получить все посты
    if method == 'GET':
        conn = get_conn()
        cur = conn.cursor()
        cat_id = params.get('cat_id')
        if cat_id:
            cur.execute(f"SELECT id, cat_id, cat, title, excerpt, content, author, img, read_time, created_at FROM {schema()}.posts WHERE cat_id = %s ORDER BY created_at DESC", (cat_id,))
        else:
            cur.execute(f"SELECT id, cat_id, cat, title, excerpt, content, author, img, read_time, created_at FROM {schema()}.posts ORDER BY created_at DESC")
        rows = cur.fetchall()
        conn.close()
        posts = [
            {'id': r[0], 'catId': r[1], 'cat': r[2], 'title': r[3], 'excerpt': r[4],
             'content': r[5], 'author': r[6], 'img': r[7], 'read': r[8],
             'date': r[9].strftime('%d %B').lstrip('0')}
            for r in rows
        ]
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'posts': posts}, ensure_ascii=False)}

    # POST / — создать пост (только автор)
    if method == 'POST':
        if not check_auth(headers):
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"INSERT INTO {schema()}.posts (cat_id, cat, title, excerpt, content, author, img, read_time) VALUES (%s,%s,%s,%s,%s,%s,%s,%s) RETURNING id",
            (body['catId'], body['cat'], body['title'], body['excerpt'], body['content'], body['author'], body['img'], body['read'])
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'id': new_id})}

    # PUT / — редактировать пост (только автор)
    if method == 'PUT':
        if not check_auth(headers):
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}
        body = json.loads(event.get('body') or '{}')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"UPDATE {schema()}.posts SET cat_id=%s, cat=%s, title=%s, excerpt=%s, content=%s, author=%s, img=%s, read_time=%s WHERE id=%s",
            (body['catId'], body['cat'], body['title'], body['excerpt'], body['content'], body['author'], body['img'], body['read'], body['id'])
        )
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    # DELETE /?id=X — удалить пост (только автор)
    if method == 'DELETE':
        if not check_auth(headers):
            return {'statusCode': 401, 'headers': CORS, 'body': json.dumps({'error': 'Неверный пароль'})}
        post_id = params.get('id')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"DELETE FROM {schema()}.posts WHERE id = %s", (post_id,))
        conn.commit()
        conn.close()
        return {'statusCode': 200, 'headers': CORS, 'body': json.dumps({'ok': True})}

    return {'statusCode': 405, 'headers': CORS, 'body': json.dumps({'error': 'Method not allowed'})}
