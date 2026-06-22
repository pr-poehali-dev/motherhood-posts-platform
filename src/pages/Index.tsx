import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const API = 'https://functions.poehali.dev/3a900c33-e45f-4e69-846b-fc87b9d70f88';

const HERO_IMG = 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/ee6ba6fb-c364-4a59-be60-9a458d71b95c.jpg';
const CARE_IMG = 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/4578d030-8e68-41d5-ac63-a97d89b6589b.jpg';

const INITIAL_POSTS = [
  { id: -1, catId: 'care', cat: 'Уход за ребёнком', title: 'Как наладить здоровый сон малыша', excerpt: 'Простые ритуалы перед сном, которые помогут уложить кроху без слёз и капризов.', content: 'Здоровый сон малыша — это основа его роста и развития.\n\n**Создайте режим дня.** Укладывайте малыша в одно и то же время каждый вечер.\n\n**Ритуал перед сном.** За 30–40 минут: тёплая ванна → массаж → кормление → колыбельная.\n\n**Обстановка в комнате.** Температура 18–22°C, плотные шторы, тишина.', author: 'Анна, мама двоих детей', img: CARE_IMG, read: '5 мин', date: '20 июня' },
  { id: -2, catId: 'food', cat: 'Питание', title: 'Первый прикорм: с чего начать', excerpt: 'Пошаговый гид по введению новых продуктов и список самых безопасных первых блюд.', content: 'Введение прикорма — волнительный момент для каждой мамы.\n\n**Когда начинать?** ВОЗ рекомендует с 6 месяцев при грудном вскармливании.\n\n**С чего начать:** кабачок, брокколи, цветная капуста, яблоко и груша (запечённые).\n\n**Чего избегать до года:** соль, сахар, мёд, орехи.', author: 'Мария, нутрициолог и мама', img: HERO_IMG, read: '7 мин', date: '18 июня' },
  { id: -3, catId: 'dev', cat: 'Развитие', title: '10 игр для развития мелкой моторики', excerpt: 'Подборка простых занятий из подручных материалов для малышей от года.', content: 'Мелкая моторика напрямую связана с развитием речи и интеллекта.\n\n**Крупы и контейнеры.** Насыпьте гречку в миску, дайте ложку — пусть пересыпает.\n\n**Лепка из теста.** Домашнее солёное тесто безопасно и отлично подходит.\n\n**Рисование пальчиками.** Используйте специальные пальчиковые краски.', author: 'Светлана, детский психолог', img: CARE_IMG, read: '4 мин', date: '15 июня' },
  { id: -4, catId: 'health', cat: 'Здоровье', title: 'Прививки по календарю: что важно знать', excerpt: 'Разбираем национальный календарь прививок и отвечаем на частые вопросы мам.', content: 'Вакцинация — один из самых эффективных способов защитить ребёнка.\n\n**Как подготовить малыша:** за день измерьте температуру, не вводите новые продукты за 3 дня.\n\n**После прививки нормально:** небольшое повышение температуры, покраснение в месте укола.\n\n**Когда звонить врачу:** температура выше 39°C, сильный отёк, судороги.', author: 'Ольга, педиатр', img: HERO_IMG, read: '6 мин', date: '12 июня' },
  { id: -5, catId: 'treat', cat: 'Лечение ребёнка', title: 'Температура у малыша: когда вызывать врача', excerpt: 'Чёткие ориентиры: при каких симптомах нужна срочная помощь, а когда можно справиться дома.', content: 'Повышенная температура пугает многих мам, но важно знать: это защитная реакция организма.\n\n**Не сбивайте сразу**, если температура ниже 38,5°C и ребёнок чувствует себя удовлетворительно.\n\n**Чем снижать:** парацетамол или ибупрофен по весу ребёнка. Аспирин детям до 15 лет — запрещён.\n\n**Срочно вызывайте скорую:** температура выше 39,5°C у малыша до 3 месяцев, судороги, сыпь.', author: 'Елена, педиатр с 15-летним стажем', img: CARE_IMG, read: '5 мин', date: '10 июня' },
];

const categories = [
  { id: 'care', title: 'Уход за ребёнком', icon: 'Baby', color: 'bg-accent', desc: 'Купание, сон, режим дня', img: 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/f78d7e7d-09f7-4853-afac-2073eb651c78.jpg' },
  { id: 'health', title: 'Здоровье', icon: 'HeartPulse', color: 'bg-secondary', desc: 'Прививки, иммунитет, врачи', img: 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/1257ea69-c20f-4158-991e-4b6758307efb.jpg' },
  { id: 'dev', title: 'Развитие', icon: 'Sparkles', color: 'bg-primary/20', desc: 'Игры, моторика, речь', img: 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/a87f0b0f-2232-4ab1-a5f4-1535625fbc96.jpg' },
  { id: 'food', title: 'Питание', icon: 'Apple', color: 'bg-muted', desc: 'Прикорм, меню, рецепты', img: 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/7d015a5d-58bb-469b-9a8c-5af4ecfacd46.jpg' },
  { id: 'treat', title: 'Лечение ребёнка', icon: 'Stethoscope', color: 'bg-primary/20', desc: 'Симптомы, лекарства, уход при болезни', img: 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/06f22d49-8737-4629-9d0b-f2bbd6d5f271.jpg' },
];

type Post = { id: number; catId: string; cat: string; title: string; excerpt: string; content: string; author: string; img: string; read: string; date: string };
const EMPTY: Omit<Post, 'id' | 'date'> = { catId: 'care', cat: 'Уход за ребёнком', title: '', excerpt: '', content: '', author: '', img: CARE_IMG, read: '5 мин' };

const PostModal = ({ post, isAuthor, onClose, onEdit, onDelete }: { post: Post; isAuthor: boolean; onClose: () => void; onEdit: (p: Post) => void; onDelete: (id: number) => void }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 backdrop-blur-sm p-4 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="bg-card rounded-[2rem] shadow-2xl w-full max-w-2xl my-8 overflow-hidden animate-scale-in">
      <div className="relative">
        <img src={post.img} alt={post.title} className="w-full aspect-[2/1] object-cover" />
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 bg-card rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform">
          <Icon name="X" size={18} className="text-foreground" />
        </button>
        {isAuthor && (
          <div className="absolute top-4 left-4 flex gap-2">
            <button onClick={() => onEdit(post)} className="flex items-center gap-1 text-xs font-bold px-3 py-2 bg-card rounded-full shadow-md hover:scale-105 transition-transform text-foreground">
              <Icon name="Pencil" size={13} /> Редактировать
            </button>
            <button onClick={() => onDelete(post.id)} className="flex items-center gap-1 text-xs font-bold px-3 py-2 bg-destructive rounded-full shadow-md hover:scale-105 transition-transform text-white">
              <Icon name="Trash2" size={13} /> Удалить
            </button>
          </div>
        )}
        <span className="absolute bottom-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-accent text-accent-foreground">{post.cat}</span>
      </div>
      <div className="p-8">
        <h2 className="font-display font-bold text-2xl text-foreground leading-snug">{post.title}</h2>
        <div className="flex items-center gap-4 mt-3 mb-6 text-xs text-muted-foreground font-semibold">
          <span className="flex items-center gap-1"><Icon name="User" size={13} /> {post.author}</span>
          <span className="flex items-center gap-1"><Icon name="Calendar" size={13} /> {post.date}</span>
          <span className="flex items-center gap-1"><Icon name="Clock" size={13} /> {post.read}</span>
        </div>
        <div className="text-sm text-foreground leading-relaxed space-y-3">
          {post.content.split('\n\n').map((para, i) => (
            <p key={i}>{para.split('**').map((chunk, j) => j % 2 === 1 ? <strong key={j}>{chunk}</strong> : chunk)}</p>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const PostEditor = ({ post, password, onClose, onSaved }: { post: Post | null; password: string; onClose: () => void; onSaved: () => void }) => {
  const isNew = !post;
  const [form, setForm] = useState<Omit<Post, 'id' | 'date'>>(post ? { catId: post.catId, cat: post.cat, title: post.title, excerpt: post.excerpt, content: post.content, author: post.author, img: post.img, read: post.read } : { ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const handleCatChange = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    setForm(f => ({ ...f, catId, cat: cat?.title || '' }));
  };

  const handleSave = async () => {
    if (!form.title || !form.content || !form.author) { setError('Заполните заголовок, текст и автора'); return; }
    setSaving(true);
    const body = isNew ? form : { ...form, id: post!.id };
    const res = await fetch(API, { method: isNew ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json', 'X-Author-Password': password }, body: JSON.stringify(body) });
    setSaving(false);
    if (res.ok) { onSaved(); onClose(); } else setError('Ошибка сохранения');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-foreground/30 backdrop-blur-sm p-4 overflow-y-auto" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-card rounded-[2rem] shadow-2xl w-full max-w-2xl my-8 p-8 animate-scale-in">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-xl text-foreground">{isNew ? 'Новый пост' : 'Редактировать пост'}</h2>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center hover:scale-110 transition-transform">
            <Icon name="X" size={16} className="text-foreground" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Тема</label>
            <select value={form.catId} onChange={e => handleCatChange(e.target.value)} className="w-full rounded-2xl border border-border px-4 py-2.5 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
              {categories.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Заголовок</label>
            <Input value={form.title} onChange={e => set('title', e.target.value)} placeholder="Введите заголовок поста" className="rounded-2xl" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Краткое описание</label>
            <Input value={form.excerpt} onChange={e => set('excerpt', e.target.value)} placeholder="Пара предложений для превью" className="rounded-2xl" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">
              Текст поста <span className="font-normal text-muted-foreground/60">(**жирный** — двойные звёздочки)</span>
            </label>
            <Textarea value={form.content} onChange={e => set('content', e.target.value)} placeholder="Напишите текст поста..." className="rounded-2xl min-h-[180px]" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Автор</label>
            <Input value={form.author} onChange={e => set('author', e.target.value)} placeholder="Ваше имя" className="rounded-2xl" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Ссылка на изображение</label>
            <Input value={form.img} onChange={e => set('img', e.target.value)} placeholder="https://..." className="rounded-2xl" />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground mb-1 block">Время чтения</label>
            <Input value={form.read} onChange={e => set('read', e.target.value)} placeholder="5 мин" className="rounded-2xl" />
          </div>
          {error && <p className="text-destructive text-sm font-semibold">{error}</p>}
          <div className="flex gap-3 pt-2">
            <Button onClick={handleSave} disabled={saving} className="rounded-full font-bold flex-1">
              {saving ? 'Сохраняем...' : isNew ? 'Опубликовать' : 'Сохранить'}
            </Button>
            <Button onClick={onClose} variant="outline" className="rounded-full">Отмена</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const AuthModal = ({ onAuth, onClose }: { onAuth: (pwd: string) => void; onClose: () => void }) => {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!pwd) return;
    setLoading(true);
    const res = await fetch(API, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Author-Password': pwd }, body: JSON.stringify({ catId: '__check__', cat: '', title: '__check__', excerpt: '', content: '', author: '', img: '', read: '' }) });
    setLoading(false);
    if (res.status === 401) { setError('Неверный пароль'); return; }
    onAuth(pwd);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/30 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-card rounded-[2rem] shadow-2xl w-full max-w-sm p-8 animate-scale-in">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
            <Icon name="Lock" size={24} className="text-primary-foreground" />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">Вход для автора</h2>
          <p className="text-sm text-muted-foreground mt-1">Введите пароль для редактирования</p>
        </div>
        <div className="space-y-3">
          <Input type="password" value={pwd} onChange={e => setPwd(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} placeholder="Пароль" className="rounded-2xl h-12" />
          {error && <p className="text-destructive text-sm font-semibold text-center">{error}</p>}
          <Button onClick={handleLogin} disabled={loading} className="rounded-full w-full font-bold h-11">
            {loading ? 'Проверяем...' : 'Войти'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function Index() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openPost, setOpenPost] = useState<Post | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authorPassword, setAuthorPassword] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [editorPost, setEditorPost] = useState<Post | null>(null);

  const isAuthor = !!authorPassword;

  const loadPosts = async () => {
    try {
      const res = await fetch(API);
      const raw = await res.json();
      const data = typeof raw === 'string' ? JSON.parse(raw) : raw;
      setPosts(data.posts?.length > 0 ? data.posts : INITIAL_POSTS);
    } catch {
      setPosts(INITIAL_POSTS);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPosts(); }, []);

  const handleCategoryClick = (id: string) => {
    setActiveCategory(prev => prev === id ? null : id);
    setTimeout(() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleDelete = async (id: number) => {
    if (id < 0) { alert('Это демо-пост. Добавьте свои посты и удалите его.'); return; }
    if (!confirm('Удалить этот пост?')) return;
    await fetch(`${API}?id=${id}`, { method: 'DELETE', headers: { 'X-Author-Password': authorPassword } });
    setOpenPost(null);
    loadPosts();
  };

  const handleEdit = (post: Post) => { setEditorPost(post); setShowEditor(true); setOpenPost(null); };
  const handleNewPost = () => { setEditorPost(null); setShowEditor(true); };

  const filteredPosts = activeCategory ? posts.filter(p => p.catId === activeCategory) : posts;
  const activeCat = categories.find(c => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-warm-gradient">
      {showAuth && <AuthModal onAuth={setAuthorPassword} onClose={() => setShowAuth(false)} />}
      {showEditor && <PostEditor post={editorPost} password={authorPassword} onClose={() => setShowEditor(false)} onSaved={loadPosts} />}
      {openPost && <PostModal post={openPost} isAuthor={isAuthor} onClose={() => setOpenPost(null)} onEdit={handleEdit} onDelete={handleDelete} />}

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
              <Icon name="Heart" className="text-primary-foreground" size={22} />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Мамин дневник</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            {categories.map((c) => (
              <button key={c.id} onClick={() => handleCategoryClick(c.id)} className={`hover:text-primary transition-colors ${activeCategory === c.id ? 'text-primary' : ''}`}>
                {c.title}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {isAuthor ? (
              <>
                <Button size="sm" onClick={handleNewPost} className="rounded-full font-semibold shadow-sm gap-1">
                  <Icon name="PenLine" size={15} /> Написать пост
                </Button>
                <Button size="sm" variant="outline" onClick={() => setAuthorPassword('')} className="rounded-full font-semibold">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <button onClick={() => setShowAuth(true)} className="text-xs text-muted-foreground hover:text-primary transition-colors font-semibold hidden md:block">
                  Войти как автор
                </button>
                <Button className="rounded-full font-semibold shadow-sm" onClick={() => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' })}>
                  Подписаться
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {isAuthor && (
        <div className="bg-primary/10 border-b border-primary/20 py-2">
          <div className="container flex items-center gap-2 text-sm font-semibold text-primary">
            <Icon name="ShieldCheck" size={16} /> Вы вошли как автор — можно создавать и редактировать посты
          </div>
        </div>
      )}

      {/* Hero */}
      <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <span className="font-hand text-3xl text-primary">тёплое сообщество мам</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight mt-3 text-foreground">Всё о малыше: уход, здоровье, развитие, питание. Делимся советами, поддержкой и теплом.</h1>
          <div className="flex flex-wrap gap-4 mt-8">
            {isAuthor && (
              <Button size="lg" onClick={handleNewPost} className="rounded-full font-semibold text-base shadow-md hover-scale">
                <Icon name="PenLine" size={18} className="mr-2" /> Написать пост
              </Button>
            )}
            <Button size="lg" variant="outline" className="rounded-full font-semibold text-base border-2" onClick={() => document.getElementById('posts')?.scrollIntoView({ behavior: 'smooth' })}>
              Читать советы
            </Button>
          </div>
        </div>
        <div className="relative animate-scale-in">
          <div className="absolute -inset-4 bg-accent/40 rounded-[3rem] blur-2xl" />
          <img src={HERO_IMG} alt="Мама с малышом" className="relative rounded-[2.5rem] shadow-xl w-full object-cover aspect-square animate-float" />
        </div>
      </section>

      {/* Categories */}
      <section className="container py-12">
        <h2 className="font-display font-bold text-3xl text-center text-foreground mb-3">Темы блога</h2>
        <p className="text-center text-muted-foreground mb-12">Нажмите на тему, чтобы увидеть посты</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {categories.map((c) => {
            const isActive = activeCategory === c.id;
            return (
              <button key={c.id} onClick={() => handleCategoryClick(c.id)} className={`group text-left bg-card rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border-2 ${isActive ? 'border-primary shadow-lg -translate-y-1' : 'border-border/40'}`}>
                <div className="relative overflow-hidden h-40">
                  <img src={c.img} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className={`absolute top-3 right-3 w-9 h-9 rounded-xl ${c.color} flex items-center justify-center shadow-sm`}>
                    <Icon name={c.icon} size={18} className="text-foreground" />
                  </div>
                  {isActive && (
                    <span className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded-full bg-primary text-primary-foreground">✓ выбрано</span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-bold text-base text-foreground">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Posts */}
      <section id="posts" className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-hand text-2xl text-primary">{activeCategory ? activeCat?.title : 'свежее'}</span>
            <h2 className="font-display font-bold text-3xl text-foreground">{activeCategory ? 'Посты по теме' : 'Последние посты'}</h2>
          </div>
          {activeCategory && (
            <button onClick={() => setActiveCategory(null)} className="flex items-center gap-1 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors">
              <Icon name="X" size={16} /> Все темы
            </button>
          )}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-7">
            {[1,2,3].map(i => <div key={i} className="bg-card rounded-[2rem] h-80 animate-pulse border border-border/40" />)}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Icon name="FileX" size={48} className="mx-auto mb-4 opacity-40" />
            <p className="font-semibold text-lg">В этой теме пока нет постов</p>
            {isAuthor && <Button onClick={handleNewPost} className="mt-4 rounded-full">Написать первый пост</Button>}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-7">
            {filteredPosts.map((p) => (
              <article key={p.id} onClick={() => setOpenPost(p)} className="bg-card rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/40 cursor-pointer group">
                <div className="overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-accent text-accent-foreground mb-3">{p.cat}</span>
                  <h3 className="font-display font-bold text-lg text-foreground leading-snug">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.excerpt}</p>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
                      <span className="flex items-center gap-1"><Icon name="Calendar" size={13} /> {p.date}</span>
                      <span className="flex items-center gap-1"><Icon name="Clock" size={13} /> {p.read}</span>
                    </div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">Читать <Icon name="ArrowRight" size={13} /></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="container py-16">
        <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/10 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="relative">
            <Icon name="Mail" size={40} className="text-primary-foreground mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl text-primary-foreground">Новые советы — прямо на почту</h2>
            <p className="text-primary-foreground/85 mt-3 max-w-md mx-auto">Подпишитесь на рассылку и получайте свежие посты о материнстве раз в неделю.</p>
            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-2 bg-card text-foreground font-semibold px-6 py-4 rounded-full shadow-md animate-scale-in">
                <Icon name="CheckCircle2" size={20} className="text-secondary-foreground" /> Спасибо! Вы подписаны
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); if (email.trim()) setSubscribed(true); }} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input type="email" required placeholder="Ваш email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full h-12 bg-card border-0 text-foreground px-5" />
                <Button type="submit" size="lg" variant="secondary" className="rounded-full font-bold h-12 shadow-md whitespace-nowrap">Подписаться</Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container py-10 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
            <Icon name="Heart" className="text-primary-foreground" size={18} />
          </div>
          <span className="font-display font-bold text-foreground">Мамин дневник</span>
        </div>
        <p className="text-sm text-muted-foreground">Сделано с любовью для мам · 2026</p>
      </footer>
    </div>
  );
}