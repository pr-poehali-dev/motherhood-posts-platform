CREATE TABLE t_p87330110_motherhood_posts_pla.posts (
  id SERIAL PRIMARY KEY,
  cat_id VARCHAR(50) NOT NULL,
  cat VARCHAR(100) NOT NULL,
  title VARCHAR(300) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author VARCHAR(200) NOT NULL,
  img VARCHAR(500) NOT NULL,
  read_time VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);