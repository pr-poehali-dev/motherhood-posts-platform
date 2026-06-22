import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const HERO_IMG = 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/ee6ba6fb-c364-4a59-be60-9a458d71b95c.jpg';
const CARE_IMG = 'https://cdn.poehali.dev/projects/707e5f3e-69b7-4eb7-9096-20901dbd833c/files/4578d030-8e68-41d5-ac63-a97d89b6589b.jpg';

const categories = [
  { id: 'care', title: 'Уход за ребёнком', icon: 'Baby', color: 'bg-accent', desc: 'Купание, сон, режим дня' },
  { id: 'health', title: 'Здоровье', icon: 'HeartPulse', color: 'bg-secondary', desc: 'Прививки, иммунитет, врачи' },
  { id: 'dev', title: 'Развитие', icon: 'Sparkles', color: 'bg-primary/20', desc: 'Игры, моторика, речь' },
  { id: 'food', title: 'Питание', icon: 'Apple', color: 'bg-muted', desc: 'Прикорм, меню, рецепты' },
  { id: 'treat', title: 'Лечение ребёнка', icon: 'Stethoscope', color: 'bg-primary/20', desc: 'Симптомы, лекарства, уход при болезни' },
];

const posts = [
  {
    cat: 'Уход за ребёнком',
    title: 'Как наладить здоровый сон малыша',
    excerpt: 'Простые ритуалы перед сном, которые помогут уложить кроху без слёз и капризов.',
    img: CARE_IMG,
    read: '5 мин',
    date: '20 июня',
  },
  {
    cat: 'Питание',
    title: 'Первый прикорм: с чего начать',
    excerpt: 'Пошаговый гид по введению новых продуктов и список самых безопасных первых блюд.',
    img: HERO_IMG,
    read: '7 мин',
    date: '18 июня',
  },
  {
    cat: 'Развитие',
    title: '10 игр для развития мелкой моторики',
    excerpt: 'Подборка простых занятий из подручных материалов для малышей от года.',
    img: CARE_IMG,
    read: '4 мин',
    date: '15 июня',
  },
];

const Index = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
        <div className="container flex items-center justify-between h-20">
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center shadow-sm">
              <Icon name="Heart" className="text-primary-foreground" size={22} />
            </div>
            <span className="font-display font-bold text-xl text-foreground">Мамин дневник</span>
          </div>
          <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-muted-foreground">
            {categories.map((c) => (
              <a key={c.id} href={`#${c.id}`} className="hover:text-primary transition-colors">{c.title}</a>
            ))}
          </nav>
          <Button className="rounded-full font-semibold shadow-sm" onClick={() => document.getElementById('subscribe')?.scrollIntoView({ behavior: 'smooth' })}>
            Подписаться
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="container py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <span className="font-hand text-3xl text-primary">тёплое сообщество мам</span>
          <h1 className="font-display font-bold text-4xl md:text-6xl leading-tight mt-3 text-foreground">
            Делитесь опытом материнства
          </h1>
          <p className="text-lg text-muted-foreground mt-6 max-w-md leading-relaxed">
            Советы по уходу, здоровью, развитию и питанию малыша — от мам для мам. Без осуждения, с теплом и заботой.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <Button size="lg" className="rounded-full font-semibold text-base shadow-md hover-scale">
              <Icon name="PenLine" size={18} className="mr-2" />
              Написать пост
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-semibold text-base border-2">
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
        <p className="text-center text-muted-foreground mb-12">Выбирайте то, что близко именно вам</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <a
              key={c.id}
              id={c.id}
              href={`#${c.id}`}
              className="group bg-card rounded-[2rem] p-7 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/40"
            >
              <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <Icon name={c.icon} size={26} className="text-foreground" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section className="container py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="font-hand text-2xl text-primary">свежее</span>
            <h2 className="font-display font-bold text-3xl text-foreground">Последние посты</h2>
          </div>
          <a href="#" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">
            Все статьи <Icon name="ArrowRight" size={16} />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-7">
          {posts.map((p, i) => (
            <article key={i} className="bg-card rounded-[2rem] overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 border border-border/40">
              <div className="overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full aspect-[4/3] object-cover hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-accent text-accent-foreground mb-3">{p.cat}</span>
                <h3 className="font-display font-bold text-lg text-foreground leading-snug">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.excerpt}</p>
                <div className="flex items-center gap-4 mt-5 text-xs text-muted-foreground font-semibold">
                  <span className="flex items-center gap-1"><Icon name="Calendar" size={14} /> {p.date}</span>
                  <span className="flex items-center gap-1"><Icon name="Clock" size={14} /> {p.read}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Subscribe */}
      <section id="subscribe" className="container py-16">
        <div className="bg-primary rounded-[2.5rem] p-10 md:p-16 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary-foreground/10 rounded-full translate-y-1/3 -translate-x-1/4" />
          <div className="relative">
            <Icon name="Mail" size={40} className="text-primary-foreground mx-auto mb-4" />
            <h2 className="font-display font-bold text-3xl text-primary-foreground">Новые советы — прямо на почту</h2>
            <p className="text-primary-foreground/85 mt-3 max-w-md mx-auto">
              Подпишитесь на рассылку и получайте свежие посты о материнстве раз в неделю.
            </p>
            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-2 bg-card text-foreground font-semibold px-6 py-4 rounded-full shadow-md animate-scale-in">
                <Icon name="CheckCircle2" size={20} className="text-secondary-foreground" />
                Спасибо! Вы подписаны
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  required
                  placeholder="Ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-full h-12 bg-card border-0 text-foreground px-5"
                />
                <Button type="submit" size="lg" variant="secondary" className="rounded-full font-bold h-12 shadow-md whitespace-nowrap">
                  Подписаться
                </Button>
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
};

export default Index;