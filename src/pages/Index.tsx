import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FABULY } from '@/data/fabuly';

const EMBLEM = 'https://cdn.poehali.dev/projects/19b1c35a-795f-4144-983c-abd02e30beed/files/c160b5f5-0003-4b68-81b1-cd326727007c.jpg';

const NAV = [
  { id: 'home', label: 'Главная', icon: 'Home' },
  { id: 'koap', label: 'Фабулы КоАП', icon: 'Scale' },
  { id: 'dtp', label: 'Справочник ДТП', icon: 'CarFront' },
  { id: 'services', label: 'Сервисы проверок', icon: 'ShieldCheck' },
  { id: 'docs', label: 'Нормативные документы', icon: 'BookMarked' },
  { id: 'search', label: 'Расширенный поиск', icon: 'Search' },
];

const DTP = [
  {
    type: 'Столкновение ТС',
    desc: 'Происшествие с участием двух и более движущихся транспортных средств. Фиксируется схема, точка контакта, расположение ТС после удара.',
    actions: 'Оградить место, вызвать аварийную службу, опросить участников и свидетелей, составить схему.',
  },
  {
    type: 'Наезд на пешехода',
    desc: 'Наезд ТС на человека либо контакт человека с движущимся ТС. Определяется траектория движения пешехода и автомобиля.',
    actions: 'Оказать первую помощь, вызвать скорую, зафиксировать следы торможения, опросить очевидцев.',
  },
  {
    type: 'Опрокидывание ТС',
    desc: 'Происшествие, при котором движущееся ТС опрокинулось без столкновения с другими участниками движения.',
    actions: 'Установить причину (скорость, состояние дороги), зафиксировать конечное положение, осмотреть проезжую часть.',
  },
  {
    type: 'Наезд на препятствие',
    desc: 'Наезд ТС на неподвижный объект (опора, ограждение, дерево). Оценивается видимость и состояние дорожного полотна.',
    actions: 'Осмотреть препятствие, зафиксировать повреждения, проверить дорожные условия и освещение.',
  },
];

const SERVICES = [
  { title: 'Проверка водительского удостоверения', desc: 'Действительность ВУ, лишение права управления', icon: 'IdCard' },
  { title: 'Проверка автомобиля', desc: 'История регистрации, розыск, ограничения, ДТП', icon: 'Car' },
  { title: 'Проверка штрафов', desc: 'Неоплаченные постановления по VIN и номеру ВУ', icon: 'ReceiptText' },
  { title: 'Проверка ОСАГО', desc: 'Действительность полиса и страховая компания', icon: 'FileCheck2' },
  { title: 'Розыск ТС', desc: 'Транспорт, находящийся в розыске', icon: 'Siren' },
  { title: 'Проверка по VIN', desc: 'Полная история по идентификационному номеру', icon: 'ScanLine' },
];

const DOCS = [
  { title: 'Кодекс РФ об административных правонарушениях', meta: 'Редакция от 2024 г.', icon: 'BookText' },
  { title: 'Правила дорожного движения РФ', meta: 'Постановление Правительства № 1090', icon: 'BookOpen' },
  { title: 'Административный регламент МВД (Приказ № 264)', meta: 'Надзор за дорожным движением', icon: 'FileBadge' },
  { title: 'Методические рекомендации по оформлению ДТП', meta: 'Служебное пособие', icon: 'ClipboardList' },
];

const NOTICES = [
  { date: '14.06.2026', text: 'Обновлён Административный регламент МВД — изменён порядок оформления европротокола.', tag: 'Регламент' },
  { date: '09.06.2026', text: 'Внесены изменения в ст. 12.8 КоАП РФ. Уточнены размеры административного штрафа.', tag: 'КоАП' },
  { date: '01.06.2026', text: 'Опубликовано новое методическое пособие по фиксации ДТП с пострадавшими.', tag: 'Пособие' },
];

function SectionTitle({ icon, kicker, title }: { icon: string; kicker: string; title: string }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 text-gos-gold mb-2">
        <Icon name={icon} size={18} />
        <span className="font-display tracking-[0.25em] uppercase text-xs">{kicker}</span>
      </div>
      <h2 className="font-display text-3xl md:text-4xl font-600 text-gos-blue uppercase tracking-wide">{title}</h2>
      <div className="mt-3 h-1 w-24 tricolor-bar" />
    </div>
  );
}

const Index = () => {
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');
  const [koapQuery, setKoapQuery] = useState('');
  const [koapFilter, setKoapFilter] = useState<'all' | 'koap' | 'uk' | 'other'>('all');

  const go = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredFabuly = FABULY.filter((f) => {
    const byCat = koapFilter === 'all' || f.category === koapFilter;
    const q = koapQuery.trim().toLowerCase();
    const byQuery =
      !q ||
      f.article.toLowerCase().includes(q) ||
      f.title.toLowerCase().includes(q) ||
      f.fabula.toLowerCase().includes(q);
    return byCat && byQuery;
  });

  const koapCount = FABULY.filter((f) => f.category === 'koap').length;
  const ukCount = FABULY.filter((f) => f.category === 'uk').length;
  const otherCount = FABULY.filter((f) => f.category === 'other').length;

  return (
    <div className="min-h-screen bg-background text-foreground gos-pattern">
      {/* Top utility bar */}
      <div className="bg-gos-blue text-primary-foreground text-xs">
        <div className="container mx-auto flex items-center justify-between py-1.5 px-4">
          <span className="font-display tracking-[0.2em] uppercase opacity-90">
            Министерство внутренних дел · ГИБДД
          </span>
          <span className="hidden sm:flex items-center gap-2 opacity-80">
            <Icon name="Lock" size={12} /> Служебный портал
          </span>
        </div>
      </div>
      <div className="h-1.5 tricolor-bar" />

      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center gap-4">
          <img src={EMBLEM} alt="Герб" className="h-16 w-16 rounded-sm object-cover shadow-sm ring-1 ring-gos-gold/40" />
          <div className="flex-1">
            <h1 className="font-display text-xl md:text-2xl font-700 text-gos-blue uppercase leading-tight">
              Памятка инспектора
            </h1>
            <p className="text-muted-foreground text-sm">
              Фабулы нарушений КоАП РФ · Справочник ДТП · Сервисы проверок
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
            <span className="font-display tracking-wider uppercase text-gos-blue">Дежурная часть</span>
            <span>02 · 102</span>
          </div>
        </div>
      </header>

      {/* Nav */}
      <nav className="sticky top-0 z-30 bg-gos-blue/95 backdrop-blur shadow-md">
        <div className="container mx-auto px-2 flex overflow-x-auto">
          {NAV.map((n) => (
            <button
              key={n.id}
              onClick={() => go(n.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-3 text-sm font-display uppercase tracking-wider transition-colors border-b-2 ${
                active === n.id
                  ? 'text-gos-gold border-gos-gold'
                  : 'text-primary-foreground/80 border-transparent hover:text-white'
              }`}
            >
              <Icon name={n.icon} size={16} />
              {n.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden bg-gos-blue text-primary-foreground">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${EMBLEM})`, backgroundSize: '420px', backgroundPosition: 'right -80px center', backgroundRepeat: 'no-repeat' }} />
        <div className="container mx-auto px-4 py-16 md:py-24 relative animate-fade-in">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-gos-gold mb-4">
              <span className="h-px w-10 bg-gos-gold" />
              <span className="font-display tracking-[0.3em] uppercase text-xs">Служебная памятка</span>
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-700 uppercase leading-[1.05]">
              Единый справочник<br /> сотрудника ГАИ
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/85 font-serif max-w-2xl">
              Готовые фабулы нарушений КоАП РФ, классификация дорожно-транспортных
              происшествий и быстрый доступ к сервисам проверок водителей и транспортных средств.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button onClick={() => go('koap')} className="bg-gos-gold text-gos-blue hover:bg-gos-gold/90 font-display uppercase tracking-wider rounded-sm">
                <Icon name="Scale" size={18} className="mr-2" /> Фабулы КоАП
              </Button>
              <Button onClick={() => go('search')} variant="outline" className="border-primary-foreground/40 text-primary-foreground bg-transparent hover:bg-white/10 font-display uppercase tracking-wider rounded-sm">
                <Icon name="Search" size={18} className="mr-2" /> Расширенный поиск
              </Button>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              {[
                { n: `${FABULY.length}`, l: 'фабул КоАП и УК' },
                { n: '4', l: 'вида ДТП' },
                { n: '6', l: 'сервисов' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl text-gos-gold">{s.n}</div>
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/70">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KoAP */}
      <section id="koap" className="container mx-auto px-4 py-16">
        <SectionTitle icon="Scale" kicker="Раздел 01" title="Фабулы нарушений КоАП и УК РФ" />

        {/* Filters */}
        <div className="mb-6 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: `Все · ${FABULY.length}` },
              { id: 'koap', label: `Глава 12 КоАП · ${koapCount}` },
              { id: 'uk', label: `Ст. 264 УК РФ · ${ukCount}` },
              { id: 'other', label: `Иные статьи · ${otherCount}` },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setKoapFilter(f.id as 'all' | 'koap' | 'uk' | 'other')}
                className={`font-display uppercase tracking-wider text-xs px-4 py-2 rounded-sm border transition-colors ${
                  koapFilter === f.id
                    ? 'bg-gos-blue text-primary-foreground border-gos-blue'
                    : 'bg-white text-foreground/70 border-border hover:border-gos-blue hover:text-gos-blue'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative lg:w-80">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={koapQuery}
              onChange={(e) => setKoapQuery(e.target.value)}
              placeholder="Поиск по статье или нарушению"
              className="pl-9 rounded-sm border-border h-11"
            />
          </div>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {filteredFabuly.map((item, i) => (
            <AccordionItem key={i} value={`fab-${i}`} className="border border-border rounded-sm bg-white overflow-hidden">
              <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-secondary/60 [&[data-state=open]]:bg-secondary">
                <div className="flex items-start gap-4 text-left">
                  <span className={`mt-0.5 shrink-0 font-display text-xs uppercase tracking-wider px-2 py-1 rounded-sm text-primary-foreground ${
                    item.category === 'uk' ? 'bg-gos-red' : item.category === 'other' ? 'bg-gos-gold text-gos-blue' : 'bg-gos-blue'
                  }`}>
                    {item.article}
                  </span>
                  <span className="font-display text-base text-gos-blue">{item.title}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5">
                <p className="font-serif italic text-foreground/90 border-l-2 border-gos-gold pl-4 mb-3">{item.fabula}</p>
                <div className="flex items-center gap-2 text-gos-red text-sm font-medium">
                  <Icon name={item.category === 'uk' ? 'Gavel' : item.category === 'other' ? 'FileWarning' : 'AlertTriangle'} size={16} />
                  {item.penalty}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {filteredFabuly.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <Icon name="SearchX" size={32} className="mx-auto mb-3 opacity-50" />
            По запросу «{koapQuery}» ничего не найдено.
          </div>
        )}
      </section>

      {/* DTP */}
      <section id="dtp" className="bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4 py-16">
          <SectionTitle icon="CarFront" kicker="Раздел 02" title="Справочник ДТП" />
          <div className="grid md:grid-cols-2 gap-5">
            {DTP.map((d, i) => (
              <div key={i} className="bg-white border border-border rounded-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex items-center justify-center h-9 w-9 rounded-sm bg-gos-blue text-primary-foreground font-display">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-display text-lg text-gos-blue uppercase">{d.type}</h3>
                </div>
                <p className="text-sm text-foreground/80 mb-3">{d.desc}</p>
                <div className="text-sm border-t border-border pt-3">
                  <span className="font-display uppercase text-xs tracking-wider text-gos-gold">Действия инспектора:</span>
                  <p className="text-foreground/75 mt-1">{d.actions}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="container mx-auto px-4 py-16">
        <SectionTitle icon="ShieldCheck" kicker="Раздел 03" title="Сервисы проверок" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <button
              key={i}
              className="group text-left bg-white border border-border rounded-sm p-6 hover:border-gos-blue hover:shadow-md transition-all"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-sm bg-gos-blue/5 text-gos-blue mb-4 group-hover:bg-gos-blue group-hover:text-primary-foreground transition-colors">
                <Icon name={s.icon} size={24} />
              </div>
              <h3 className="font-display text-base text-gos-blue mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-gos-gold font-display uppercase tracking-wider">
                Открыть <Icon name="ArrowRight" size={14} />
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Docs + Notices */}
      <section id="docs" className="bg-gos-blue text-primary-foreground">
        <div className="container mx-auto px-4 py-16 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-gos-gold mb-2">
              <Icon name="BookMarked" size={18} />
              <span className="font-display tracking-[0.25em] uppercase text-xs">Раздел 04</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl uppercase tracking-wide mb-8">Нормативные документы</h2>
            <div className="space-y-3">
              {DOCS.map((d, i) => (
                <button key={i} className="w-full flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-sm p-4 text-left transition-colors">
                  <Icon name={d.icon} size={22} className="text-gos-gold shrink-0" />
                  <div className="flex-1">
                    <div className="font-display">{d.title}</div>
                    <div className="text-xs text-primary-foreground/60">{d.meta}</div>
                  </div>
                  <Icon name="Download" size={18} className="text-primary-foreground/60" />
                </button>
              ))}
            </div>
          </div>

          {/* Notices */}
          <div>
            <div className="flex items-center gap-2 text-gos-gold mb-2">
              <Icon name="Bell" size={18} />
              <span className="font-display tracking-[0.25em] uppercase text-xs">Уведомления</span>
            </div>
            <h2 className="font-display text-2xl uppercase tracking-wide mb-6">Обновления</h2>
            <div className="space-y-3">
              {NOTICES.map((n, i) => (
                <div key={i} className="bg-white/5 border-l-2 border-gos-gold rounded-sm p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-display uppercase tracking-wider bg-gos-gold text-gos-blue px-2 py-0.5 rounded-sm">{n.tag}</span>
                    <span className="text-xs text-primary-foreground/60">{n.date}</span>
                  </div>
                  <p className="text-sm text-primary-foreground/85">{n.text}</p>
                </div>
              ))}
            </div>
            <Button className="mt-5 w-full bg-gos-gold text-gos-blue hover:bg-gos-gold/90 font-display uppercase tracking-wider rounded-sm">
              <Icon name="BellPlus" size={16} className="mr-2" /> Подписаться на обновления
            </Button>
          </div>
        </div>
      </section>

      {/* Search */}
      <section id="search" className="container mx-auto px-4 py-16">
        <SectionTitle icon="Search" kicker="Раздел 05" title="Расширенный поиск" />
        <div className="bg-white border border-border rounded-sm p-6 md:p-8 max-w-3xl">
          <p className="text-muted-foreground mb-5">
            Поиск по базам нарушений КоАП РФ и классификатору ДТП. Введите статью, ключевое слово или вид происшествия.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Например: ст. 12.8 или «опьянение»"
                className="pl-10 rounded-sm border-border h-12"
              />
            </div>
            <Button className="bg-gos-blue hover:bg-gos-blue/90 font-display uppercase tracking-wider rounded-sm h-12 px-8">
              Найти
            </Button>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {['Опьянение', 'Превышение скорости', 'Встречная полоса', 'Наезд на пешехода', 'Без ОСАГО'].map((t) => (
              <button
                key={t}
                onClick={() => setQuery(t)}
                className="text-xs font-display uppercase tracking-wider border border-border rounded-sm px-3 py-1.5 text-foreground/70 hover:border-gos-blue hover:text-gos-blue transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gos-blue text-primary-foreground/70 border-t-4 border-gos-gold">
        <div className="h-1.5 tricolor-bar" />
        <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={EMBLEM} alt="Герб" className="h-10 w-10 rounded-sm object-cover" />
            <div>
              <div className="font-display uppercase tracking-wider text-primary-foreground text-sm">Памятка инспектора ГАИ</div>
              <div className="text-xs">Служебный портал · Только для внутреннего пользования</div>
            </div>
          </div>
          <div className="text-xs text-center md:text-right">
            <p>© 2026 ГИБДД МВД России</p>
            <p>Информация носит справочный характер</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;