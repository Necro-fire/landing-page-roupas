import { useEffect, useRef, useState } from "react";

const WHATSAPP_NUMBER = "5599999999999";
const wa = (msg: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

/* ---------------- Reveal on scroll ---------------- */
const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            (e.target as HTMLElement).style.opacity = "1";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
};

/* ---------------- Header ---------------- */
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Feminino", href: "#feminino" },
    { label: "Infantil", href: "#infantil" },
    { label: "Novidades", href: "#novidades" },
    { label: "Contato", href: "#contato" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "glass shadow-soft py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gradient-primary shadow-soft" />
          <span className="font-display text-2xl font-semibold tracking-wide text-foreground">
            Bella<span className="text-accent"> Moda</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-foreground/80 hover:text-accent transition-colors after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={wa("Olá, quero comprar uma peça")}
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-accent px-5 py-2.5 text-sm font-medium text-accent-foreground shadow-soft hover:shadow-elegant hover:scale-105 transition-all"
        >
          <WhatsIcon className="h-4 w-4" />
          Comprar no WhatsApp
        </a>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden rounded-full p-2 text-foreground hover:bg-secondary transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {open ? <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-in">
          <div className="container flex flex-col gap-3 py-4">
            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-foreground/80 hover:text-accent">
                {l.label}
              </a>
            ))}
            <a
              href={wa("Olá, quero comprar uma peça")}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-accent px-5 py-3 text-sm font-medium text-accent-foreground shadow-soft"
            >
              <WhatsIcon className="h-4 w-4" />
              Comprar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

/* ---------------- Hero Carousel ---------------- */
const slides = [
  {
    eyebrow: "Coleção feminina",
    title: "Elegância para todos os momentos",
    subtitle: "Moda feminina moderna, leve e cheia de personalidade.",
    cta: "Ver Feminino",
    href: "#feminino",
    img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
    bg: "from-[hsl(340_80%_94%)] via-[hsl(28_50%_95%)] to-[hsl(291_60%_94%)]",
  },
  {
    eyebrow: "Linha infantil",
    title: "Estilo que acompanha o crescimento",
    subtitle: "Moda infantil confortável, bonita e cheia de charme.",
    cta: "Ver Infantil",
    href: "#infantil",
    img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=900&q=80",
    bg: "from-[hsl(28_60%_95%)] via-[hsl(340_70%_96%)] to-[hsl(40_70%_94%)]",
  },
  {
    eyebrow: "Novidades da semana",
    title: "Peças selecionadas para você",
    subtitle: "Descubra o que chegou e renove seu guarda-roupa.",
    cta: "Explorar",
    href: "#novidades",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80",
    bg: "from-[hsl(291_60%_94%)] via-[hsl(340_70%_96%)] to-[hsl(28_50%_95%)]",
  },
];

const Hero = () => {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  useEffect(() => {
    const t = setInterval(() => {
      if (!paused.current) setI((p) => (p + 1) % slides.length);
    }, 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      id="inicio"
      className="relative pt-28 md:pt-32 pb-12 overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <div className="container">
        <div className="relative rounded-[2rem] overflow-hidden shadow-elegant min-h-[520px] md:min-h-[580px]">
          {slides.map((s, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 bg-gradient-to-br ${s.bg} transition-all duration-1000 ease-out ${
                idx === i ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
              }`}
            >
              <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
              <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />

              <div className="relative grid md:grid-cols-2 gap-8 items-center h-full p-8 md:p-14">
                <div className={`space-y-6 ${idx === i ? "animate-fade-up" : ""}`}>
                  <span className="inline-block rounded-full bg-white/70 px-4 py-1.5 text-xs font-medium tracking-widest uppercase text-accent">
                    {s.eyebrow}
                  </span>
                  <h1 className="font-display text-4xl md:text-6xl font-semibold leading-tight text-balance text-foreground">
                    {s.title}
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground max-w-md">{s.subtitle}</p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href={s.href}
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-soft hover:shadow-elegant hover:scale-105 transition-all"
                    >
                      {s.cta}
                      <ArrowIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={wa("Olá, vim do site Bella Moda")}
                      target="_blank"
                      rel="noopener"
                      className="inline-flex items-center gap-2 rounded-full bg-white/80 px-7 py-3.5 text-sm font-medium text-foreground hover:bg-white transition-all"
                    >
                      <WhatsIcon className="h-4 w-4 text-[hsl(var(--whatsapp))]" />
                      WhatsApp
                    </a>
                  </div>
                </div>

                <div className={`relative ${idx === i ? "animate-fade-in-right" : ""}`}>
                  <div className="relative mx-auto w-full max-w-sm md:max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden shadow-elegant animate-float">
                    <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 hidden md:flex items-center gap-3 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-soft">
                    <div className="h-10 w-10 rounded-full bg-gradient-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">Atendimento</div>
                      <div className="text-sm font-medium">Personalizado ♥</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* indicators */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setI(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === i ? "w-8 bg-accent" : "w-2 bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Categorias ---------------- */
const categories = [
  {
    title: "Feminino",
    items: ["Vestidos", "Blusas", "Conjuntos", "Moda casual"],
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80",
    href: "#feminino",
  },
  {
    title: "Infantil",
    items: ["Vestidos infantis", "Conjuntos", "Looks confortáveis"],
    img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=900&q=80",
    href: "#infantil",
  },
];

const Categorias = () => (
  <section className="py-20 md:py-28">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Categorias</span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3 text-balance">
          Encontre o estilo perfeito
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {categories.map((c) => (
          <a
            key={c.title}
            href={c.href}
            data-reveal
            className="group relative overflow-hidden rounded-[2rem] aspect-[4/3] shadow-soft hover:shadow-elegant transition-all duration-500"
          >
            <img
              src={c.img}
              alt={c.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
            <div className="absolute inset-0 p-7 md:p-10 flex flex-col justify-end text-white">
              <h3 className="font-display text-3xl md:text-4xl font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-white/85 mb-4">{c.items.join(" • ")}</p>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white text-foreground px-5 py-2.5 text-sm font-medium shadow-soft group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                Ver coleção <ArrowIcon className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Catálogo ---------------- */
type Product = { id: string; name: string; price: string; img: string; tag?: string };
const feminino: Product[] = [
  { id: "f1", name: "Vestido Floral Lia", price: "R$ 189,90", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=80", tag: "Novo" },
  { id: "f2", name: "Blusa Suave Aurora", price: "R$ 119,90", img: "https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=700&q=80" },
  { id: "f3", name: "Conjunto Bem-me-quer", price: "R$ 249,90", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=80" },
  { id: "f4", name: "Vestido Casual Manu", price: "R$ 169,90", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=700&q=80", tag: "Top" },
];
const infantil: Product[] = [
  { id: "i1", name: "Vestidinho Margarida", price: "R$ 99,90", img: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=700&q=80" },
  { id: "i2", name: "Conjunto Pequena Joia", price: "R$ 119,90", img: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&w=700&q=80", tag: "Novo" },
  { id: "i3", name: "Look Confortinho", price: "R$ 89,90", img: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&w=700&q=80" },
  { id: "i4", name: "Vestido Princesinha", price: "R$ 139,90", img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=700&q=80" },
];

const ProductCard = ({ p }: { p: Product }) => (
  <article
    data-reveal
    className="group rounded-[1.5rem] bg-card overflow-hidden shadow-soft hover:shadow-elegant transition-all duration-500 hover:-translate-y-1"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
      <img
        src={p.img}
        alt={p.name}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      {p.tag && (
        <span className="absolute top-3 left-3 rounded-full bg-destructive text-destructive-foreground text-[10px] uppercase tracking-wider px-3 py-1 shadow-soft">
          {p.tag}
        </span>
      )}
    </div>
    <div className="p-5 space-y-3">
      <div>
        <h3 className="font-display text-lg font-semibold leading-tight">{p.name}</h3>
        <p className="text-accent font-semibold mt-1">{p.price}</p>
      </div>
      <a
        href={wa(`Quero comprar o ${p.name}`)}
        target="_blank"
        rel="noopener"
        className="flex items-center justify-center gap-2 w-full rounded-full bg-foreground text-background py-2.5 text-sm font-medium hover:bg-accent transition-colors"
      >
        <WhatsIcon className="h-4 w-4" />
        Comprar no WhatsApp
      </a>
    </div>
  </article>
);

const Catalogo = ({ id, eyebrow, title, products }: { id: string; eyebrow: string; title: string; products: Product[] }) => (
  <section id={id} className="py-20 md:py-24 bg-gradient-soft">
    <div className="container">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-10" data-reveal>
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold mt-2">{title}</h2>
        </div>
        <a
          href={wa(`Olá! Quero ver mais opções de ${title}`)}
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium text-accent hover:gap-3 transition-all"
        >
          Ver tudo <ArrowIcon className="h-4 w-4" />
        </a>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </div>
  </section>
);

/* ---------------- Destaque ---------------- */
const destaqueImgs = [
  "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1485518882345-15568b007407?auto=format&fit=crop&w=900&q=80",
];
const Destaque = () => {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % destaqueImgs.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="novidades" className="py-20 md:py-28 overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center">
        <div className="relative" data-reveal>
          <div className="absolute -inset-6 bg-gradient-primary rounded-[2.5rem] blur-2xl opacity-50" />
          <div className="relative aspect-[4/5] max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-elegant animate-float">
            {destaqueImgs.map((src, i) => (
              <img
                key={src}
                src={src}
                alt="Look em destaque"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 animate-soft-zoom ${
                  i === idx ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
        </div>
        <div className="space-y-6" data-reveal>
          <span className="text-xs uppercase tracking-[0.3em] text-accent">Look completo</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-balance">
            Peças que combinam com você
          </h2>
          <p className="text-muted-foreground max-w-md">
            Curadoria especial de looks para você se sentir bonita, confortável e única em cada ocasião.
          </p>
          <a
            href={wa("Quero comprar o look em destaque")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-accent px-7 py-3.5 text-sm font-medium text-accent-foreground shadow-soft hover:shadow-elegant hover:scale-105 transition-all"
          >
            Comprar agora <ArrowIcon className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

/* ---------------- Diferenciais ---------------- */
const diffs = [
  { title: "Qualidade premium", desc: "Tecidos selecionados e acabamento impecável.", icon: "✨" },
  { title: "Conforto no dia a dia", desc: "Modelagens pensadas para o seu bem-estar.", icon: "🌸" },
  { title: "Moda atual", desc: "Tendências que valorizam o seu estilo.", icon: "👗" },
  { title: "Atendimento personalizado", desc: "Falamos com você direto pelo WhatsApp.", icon: "💬" },
];
const Diferenciais = () => (
  <section className="py-20 md:py-24 bg-secondary/40">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-12" data-reveal>
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Por que Bella Moda</span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold mt-3">Feita pensando em você</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {diffs.map((d) => (
          <div
            key={d.title}
            data-reveal
            className="rounded-2xl bg-card p-6 shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-primary grid place-items-center text-2xl mb-4">
              {d.icon}
            </div>
            <h3 className="font-display text-xl font-semibold mb-1">{d.title}</h3>
            <p className="text-sm text-muted-foreground">{d.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------- Sobre ---------------- */
const Sobre = () => (
  <section className="py-20 md:py-28">
    <div className="container grid md:grid-cols-2 gap-12 items-center">
      <div className="relative" data-reveal>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80" alt="Estilo Bella Moda" className="rounded-2xl shadow-soft aspect-[3/4] object-cover" />
          <img src="https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&w=600&q=80" alt="Moda infantil" className="rounded-2xl shadow-soft aspect-[3/4] object-cover mt-8" />
        </div>
      </div>
      <div className="space-y-5" data-reveal>
        <span className="text-xs uppercase tracking-[0.3em] text-accent">Sobre a loja</span>
        <h2 className="font-display text-3xl md:text-5xl font-semibold">Estilo, confiança e amor por moda</h2>
        <p className="text-muted-foreground">
          A <strong className="text-foreground">Bella Moda</strong> nasceu para mulheres e mães que querem se vestir bem
          sem complicação. Selecionamos peças femininas e infantis com carinho, qualidade e preço justo —
          tudo com atendimento próximo, pessoal e direto pelo WhatsApp.
        </p>
        <ul className="space-y-2 text-sm">
          {["Curadoria feminina e infantil", "Atendimento humano e ágil", "Compra simples pelo WhatsApp"].map((x) => (
            <li key={x} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

/* ---------------- CTA Final ---------------- */
const CTA = () => (
  <section id="contato" className="py-20 md:py-24">
    <div className="container">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-accent p-10 md:p-16 text-center text-accent-foreground shadow-elegant"
      >
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
        <div className="relative space-y-6 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.3em] opacity-80">Vamos conversar</span>
          <h2 className="font-display text-3xl md:text-5xl font-semibold text-balance">
            Escolha seu estilo e compre agora
          </h2>
          <p className="opacity-90">
            Atendimento rápido e personalizado. Tire dúvidas, peça fotos e finalize sua compra direto com a gente.
          </p>
          <a
            href={wa("Olá! Quero falar com a Bella Moda")}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 rounded-full bg-white text-foreground px-8 py-4 text-sm font-medium shadow-soft hover:scale-105 transition-all"
          >
            <WhatsIcon className="h-5 w-5 text-[hsl(var(--whatsapp))]" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </div>
  </section>
);

/* ---------------- Footer ---------------- */
const Footer = () => (
  <footer className="border-t border-border py-12 bg-secondary/30">
    <div className="container grid md:grid-cols-3 gap-8 items-start">
      <div>
        <div className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gradient-primary" />
          <span className="font-display text-2xl font-semibold">
            Bella<span className="text-accent"> Moda</span>
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-xs">
          Moda feminina e infantil com curadoria carinhosa e atendimento direto pelo WhatsApp.
        </p>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Navegação</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="#inicio" className="hover:text-accent">Início</a></li>
          <li><a href="#feminino" className="hover:text-accent">Feminino</a></li>
          <li><a href="#infantil" className="hover:text-accent">Infantil</a></li>
          <li><a href="#novidades" className="hover:text-accent">Novidades</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-display text-lg mb-3">Contato</h4>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <a href={wa("Olá Bella Moda!")} target="_blank" rel="noopener" className="hover:text-accent inline-flex items-center gap-2">
              <WhatsIcon className="h-4 w-4" /> WhatsApp
            </a>
          </li>
          <li>
            <a href="https://instagram.com" target="_blank" rel="noopener" className="hover:text-accent inline-flex items-center gap-2">
              <InstaIcon className="h-4 w-4" /> Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="container mt-10 pt-6 border-t border-border text-xs text-muted-foreground flex flex-wrap justify-between gap-2">
      <span>© {new Date().getFullYear()} Bella Moda. Todos os direitos reservados.</span>
      <span>Feito com ♥ para você</span>
    </div>
  </footer>
);

/* ---------------- Floating WhatsApp ---------------- */
const FloatingWhats = () => (
  <a
    href={wa("Olá, quero comprar uma peça")}
    target="_blank"
    rel="noopener"
    aria-label="Comprar no WhatsApp"
    className="fixed bottom-6 right-6 z-50 group"
  >
    <span className="absolute inset-0 rounded-full bg-[hsl(var(--whatsapp))] animate-pulse-ring" />
    <span className="relative grid place-items-center h-14 w-14 rounded-full bg-[hsl(var(--whatsapp))] text-white shadow-elegant hover:scale-110 transition-transform">
      <WhatsIcon className="h-7 w-7" />
    </span>
  </a>
);

/* ---------------- Icons ---------------- */
const WhatsIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.555-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
  </svg>
);
const ArrowIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);
const InstaIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ---------------- Page ---------------- */
const Index = () => {
  useReveal();
  useEffect(() => {
    document.title = "Bella Moda — Moda feminina e infantil com elegância";
    const meta = document.querySelector('meta[name="description"]') || (() => {
      const m = document.createElement("meta");
      m.setAttribute("name", "description");
      document.head.appendChild(m);
      return m;
    })();
    meta.setAttribute("content", "Bella Moda: moda feminina e infantil moderna, confortável e elegante. Compre rápido pelo WhatsApp.");
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categorias />
        <Catalogo id="feminino" eyebrow="Feminino" title="Coleção feminina" products={feminino} />
        <Catalogo id="infantil" eyebrow="Infantil" title="Coleção infantil" products={infantil} />
        <Destaque />
        <Diferenciais />
        <Sobre />
        <CTA />
      </main>
      <Footer />
      <FloatingWhats />
    </div>
  );
};

export default Index;
