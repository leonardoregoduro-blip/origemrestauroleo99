'use client'

import { useEffect, useRef, useState } from 'react'
const img1Before = '/restorations/photo_4949531736983407752_y.jpg'
const img1After = '/restorations/photo_4949531736983407753_y.jpg'
const img2Before = '/restorations/photo_4949531736983407750_y-1.jpg'
const img2After = '/restorations/photo_4949531736983407750_y__1_.jpg'
const img3Before = '/restorations/photo_4949531736983407761_x.jpg'
const img3After = '/restorations/photo_4949531736983407761_x__1_.jpg'

const WHATSAPP = '5562993040004'
const INSTAGRAM = 'https://www.instagram.com/origemrestauro'
const FACEBOOK = 'https://www.facebook.com/OrigemRestauro'
const WHATSAPP_MESSAGE = 'Olá! Gostaria de um orçamento para restauração de fotos.'
const whatsappLink = (message = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`

const galleryItems = [
  {
    before: img1Before,
    after: img1After,
    label: 'Foto em combate 2023',
    detail: 'Recuperação de nitidez, contraste e detalhes',
  },
  {
    before: img2Before,
    after: img2After,
    label: 'Foto em família 2011',
    detail: 'Correção de danos e reconstrução de áreas',
  },
  {
    before: img3Before,
    after: img3After,
    label: 'Aniversário em família 2008',
    detail: 'Revitalização de cor e acabamento',
  },
]

function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <span
        className={`grid h-9 w-9 place-items-center rounded-full border ${
          light ? 'border-white/25 text-bronze-light' : 'border-ink/15 text-bronze'
        }`}
        aria-hidden="true"
      >
        <svg
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
        </svg>
      </span>
      <span
        className={`font-display text-xl font-semibold tracking-tight ${
          light ? 'text-paper' : 'text-ink'
        }`}
      >
        Origem <span className="font-normal italic">Restauro</span>
      </span>
    </span>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const links = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Processo', href: '#processo' },
    { label: 'Depoimentos', href: '#depoimentos' },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className={`mx-auto max-w-7xl rounded-full border transition-all duration-500 ${
          scrolled
            ? 'border-ink/10 bg-paper/90 shadow-[0_12px_40px_rgba(22,19,17,0.10)] backdrop-blur-xl'
            : 'border-transparent bg-paper/70 backdrop-blur-md'
        }`}
        aria-label="Navegação principal"
      >
        <div className="flex h-16 items-center justify-between px-4 pl-5 md:px-6">
          <a href="#inicio" aria-label="Origem Restauro — início">
            <Brand />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-warm-brown transition-colors hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/enviar-fotos"
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition-all hover:-translate-y-0.5 hover:bg-bronze sm:flex"
            >
              Enviar minhas fotos
              <Icon name="arrowUpRight" size={16} />
            </a>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 text-ink lg:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <Icon name={menuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div id="mobile-menu" className="border-t border-ink/10 px-6 pb-6 pt-4 lg:hidden">
            <div className="flex flex-col">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-ink/10 py-4 text-lg font-medium text-ink"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/enviar-fotos"
                className="mt-5 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 font-semibold text-paper"
              >
                Enviar fotos para análise
                <Icon name="arrowUpRight" size={18} />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section
      id="inicio"
      className="noise relative min-h-screen overflow-hidden bg-paper pb-20 pt-32 lg:pb-28 lg:pt-40"
    >
      <div className="pointer-events-none absolute -right-24 top-20 h-80 w-80 rounded-full bg-bronze/15 blur-3xl" />
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="relative z-10 animate-rise">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white/45 px-4 py-2 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-bronze" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-warm-brown">
              Restauração fotográfica
            </span>
          </div>

          <h1 className="max-w-2xl text-balance font-display text-[clamp(3.8rem,8vw,7.4rem)] font-medium leading-[0.82] tracking-[-0.055em] text-ink">
            O tempo passa.
            <span className="mt-3 block font-normal italic text-bronze">A memória fica.</span>
          </h1>

          <p className="mt-8 max-w-lg text-lg leading-relaxed text-warm-brown md:text-xl">
            Recuperamos fotografias marcadas pelo tempo com técnica, sensibilidade e respeito à
            história de cada família.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/enviar-fotos"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ink px-7 py-4 font-semibold text-paper transition-all hover:-translate-y-1 hover:bg-bronze hover:shadow-xl"
            >
              <Icon name="upload" size={20} />
              Enviar fotos para análise
              <span className="transition-transform group-hover:translate-x-1">
                <Icon name="arrowRight" size={18} />
              </span>
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-ink/15 bg-white/30 px-7 py-4 font-semibold text-ink transition-all hover:bg-white/70"
            >
              Ver transformações
              <Icon name="arrowDown" size={18} />
            </a>
          </div>

          <div className="mt-12 flex items-center gap-5 border-t border-ink/10 pt-6">
            <div className="flex -space-x-2" aria-hidden="true">
              {[img1After, img2After, img3After].map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="h-10 w-10 rounded-full border-2 border-paper object-cover"
                />
              ))}
            </div>
            <p className="max-w-52 text-sm leading-snug text-muted-brown">
              Histórias reais recuperadas com cuidado artesanal
            </p>
          </div>
        </div>

        <div className="relative min-h-[520px] animate-rise-delayed md:min-h-[680px]">
          <div className="absolute left-[4%] top-[8%] h-[82%] w-[72%] rotate-[-3deg] rounded-[2rem] bg-sand shadow-2xl" />
          <figure className="absolute right-0 top-0 h-[82%] w-[76%] rotate-[2deg] overflow-hidden rounded-[2rem] border-[10px] border-white bg-white shadow-[0_32px_80px_rgba(43,31,24,0.22)] md:border-[14px]">
            <img
              src={img1After}
              alt="Foto em combate restaurada"
              className="h-full w-full object-cover"
              fetchPriority="high"
            />
            <figcaption className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-full bg-ink/80 px-4 py-3 text-paper backdrop-blur-md">
              <span className="text-xs font-semibold uppercase tracking-widest">Depois</span>
              <span className="text-xs text-paper/65">Origem Restauro</span>
            </figcaption>
          </figure>

          <figure className="absolute bottom-0 left-0 z-10 w-[48%] rotate-[-5deg] overflow-hidden rounded-2xl border-[8px] border-white bg-white shadow-2xl md:border-[10px]">
            <img
              src={img1Before}
              alt="Foto em combate antes da restauração"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="flex items-center justify-between bg-white px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-brown">
                Antes
              </span>
              <span className="text-xs text-muted-brown">2023</span>
            </figcaption>
          </figure>

          <div className="absolute bottom-[8%] right-[2%] z-20 grid h-24 w-24 place-items-center rounded-full bg-bronze text-center text-xs font-bold uppercase tracking-widest text-paper shadow-xl md:h-28 md:w-28">
            Resultado
            <br />
            real
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustStrip() {
  const items = [
    ['01', 'Análise individual'],
    ['02', 'Atendimento nacional'],
    ['03', 'Alta resolução'],
    ['04', 'Privacidade garantida'],
  ]

  return (
    <section className="border-y border-ink/10 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 lg:grid-cols-4">
        {items.map(([number, label], index) => (
          <div
            key={label}
            className={`flex items-center gap-4 py-6 lg:px-7 ${
              index > 0 ? 'lg:border-l lg:border-ink/10' : ''
            }`}
          >
            <span className="font-display text-lg italic text-bronze">{number}</span>
            <span className="text-sm font-semibold text-ink">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  light?: boolean
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.6fr] lg:items-end">
      <div>
        <p
          className={`mb-5 text-xs font-bold uppercase tracking-[0.22em] ${
            light ? 'text-bronze-light' : 'text-bronze'
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`text-balance font-display text-5xl font-medium leading-[0.96] tracking-tight md:text-7xl ${
            light ? 'text-paper' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </div>
      {description && (
        <p
          className={`max-w-md text-lg leading-relaxed ${
            light ? 'text-paper/60' : 'text-warm-brown'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

function Services() {
  const services = [
    {
      icon: 'restore',
      title: 'Restauração completa',
      text: 'Rasgos, manchas, riscos e partes perdidas reconstruídas com precisão.',
      className: 'md:col-span-2 lg:col-span-2',
    },
    {
      icon: 'color',
      title: 'Colorização natural',
      text: 'Cores recriadas com equilíbrio e fidelidade ao período da fotografia.',
      className: '',
    },
    {
      icon: 'enhance',
      title: 'Nitidez e qualidade',
      text: 'Mais definição, contraste e detalhes sem perder a naturalidade.',
      className: '',
    },
    {
      icon: 'scan',
      title: 'Digitalização',
      text: 'Conversão em alta resolução para preservar e compartilhar.',
      className: '',
    },
    {
      icon: 'print',
      title: 'Impressão premium',
      text: 'Acabamento fotográfico pensado para atravessar novas gerações.',
      className: 'md:col-span-2 lg:col-span-1',
    },
  ]

  return (
    <section id="servicos" className="bg-ink px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="O que fazemos"
          title={
            <>
              Tecnologia com
              <span className="block font-normal italic text-bronze-light">olhar humano.</span>
            </>
          }
          description="Cada imagem recebe um tratamento único. Não apagamos sua história — revelamos o que o tempo escondeu."
          light
        />

        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`group relative min-h-72 overflow-hidden rounded-[2rem] border border-white/10 bg-coal p-8 transition-all duration-500 hover:-translate-y-1 hover:border-bronze/50 hover:bg-[#28221e] ${service.className}`}
            >
              <span className="absolute right-7 top-6 font-display text-5xl italic text-white/[0.05]">
                0{index + 1}
              </span>
              <div className="grid h-12 w-12 place-items-center rounded-full border border-white/15 text-bronze-light transition-colors group-hover:bg-bronze group-hover:text-white">
                <Icon name={service.icon} />
              </div>
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="font-display text-3xl font-medium text-paper">{service.title}</h3>
                <p className="mt-3 max-w-md leading-relaxed text-paper/55">{service.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function BeforeAfterCard({
  before,
  after,
  label,
  detail,
  featured = false,
  className = '',
}: {
  before: string
  after: string
  label: string
  detail: string
  featured?: boolean
  className?: string
}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = (clientX: number) => {
    if (!containerRef.current) return
    const { left, width } = containerRef.current.getBoundingClientRect()
    setPosition(Math.min(100, Math.max(0, ((clientX - left) / width) * 100)))
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault()
      setPosition(event.key === 'Home' ? 0 : 100)
      return
    }
    const direction = ['ArrowLeft', 'ArrowDown'].includes(event.key)
      ? -2
      : ['ArrowRight', 'ArrowUp'].includes(event.key)
        ? 2
        : 0
    if (direction) {
      event.preventDefault()
      setPosition((current) => Math.min(100, Math.max(0, current + direction)))
    }
  }

  return (
    <article className={`group ${className}`}>
      <div
        ref={containerRef}
        className={`relative cursor-col-resize select-none overflow-hidden rounded-[2rem] bg-sand shadow-[0_20px_60px_rgba(43,31,24,0.10)] ${
          featured ? 'aspect-[16/10] md:aspect-[16/8]' : 'aspect-[4/3]'
        }`}
        style={{ touchAction: 'pan-y' }}
        role="slider"
        tabIndex={0}
        aria-label={`Comparar antes e depois: ${label}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% da imagem original visível`}
        onKeyDown={onKeyDown}
        onPointerDown={(event) => {
          dragging.current = true
          event.currentTarget.setPointerCapture(event.pointerId)
          updatePosition(event.clientX)
        }}
        onPointerMove={(event) => dragging.current && updatePosition(event.clientX)}
        onPointerUp={(event) => {
          dragging.current = false
          if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId)
          }
        }}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img
          src={after}
          alt={`${label}, depois da restauração`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <img
            src={before}
            alt={`${label}, antes da restauração`}
            className="absolute inset-0 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div
          className="absolute inset-y-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
          style={{ left: `${position}%` }}
        />
        <div
          className="absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-white bg-ink text-white shadow-xl transition-transform group-hover:scale-110"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <Icon name="compare" size={20} />
        </div>

        <span className="absolute left-5 top-5 rounded-full bg-ink/75 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur">
          Antes
        </span>
        <span className="absolute right-5 top-5 rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-widest text-ink backdrop-blur">
          Depois
        </span>
      </div>

      <div className="flex items-start justify-between gap-5 px-2 pt-6">
        <div>
          <h3 className="font-display text-2xl font-semibold text-ink md:text-3xl">{label}</h3>
          <p className="mt-1 text-sm text-muted-brown">{detail}</p>
        </div>
        <a
          href={whatsappLink(`Olá! Vi o resultado “${label}” e gostaria de restaurar uma foto.`)}
          target="_blank"
          rel="noopener noreferrer"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all hover:border-bronze hover:bg-bronze hover:text-white"
          aria-label={`Solicitar uma restauração como ${label}`}
        >
          <Icon name="arrowUpRight" size={18} />
        </a>
      </div>
    </article>
  )
}

function Portfolio() {
  return (
    <section id="portfolio" className="bg-paper px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Resultados reais"
          title={
            <>
              Veja o que o tempo
              <span className="block font-normal italic text-bronze">não conseguiu apagar.</span>
            </>
          }
          description="Arraste o controle sobre cada imagem para revelar os detalhes recuperados."
        />

        <div className="mt-16 grid gap-x-6 gap-y-14 lg:grid-cols-2">
          {galleryItems.map((item, index) => (
            <BeforeAfterCard
              key={item.label}
              {...item}
              featured={index === 0}
              className={index === 0 ? 'lg:col-span-2' : ''}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    [
      'Envie sua foto',
      'Mande a imagem pelo WhatsApp. Se precisar, orientamos como fotografar ou digitalizar.',
    ],
    [
      'Receba a análise',
      'Avaliamos os danos e enviamos valor, possibilidades e prazo sem compromisso.',
    ],
    [
      'Acompanhe o cuidado',
      'Após a aprovação, restauramos cada detalhe respeitando a identidade original.',
    ],
    [
      'Reviva a memória',
      'Você recebe o arquivo final em alta resolução, pronto para guardar e imprimir.',
    ],
  ]

  return (
    <section id="processo" className="overflow-hidden bg-cream px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative">
          <div className="absolute -left-6 -top-6 h-full w-full rounded-[2.5rem] border border-bronze/25" />
          <div className="noise relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-ink p-7 shadow-[0_30px_80px_rgba(24,20,17,0.18)] md:p-10">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-bronze/20" />
            <div className="absolute -right-12 -top-12 h-72 w-72 rounded-full border border-bronze/10" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-bronze/10 blur-3xl" />

            <div className="relative flex h-full flex-col rounded-[1.75rem] border border-white/10 p-7 md:p-10">
              <Brand light />

              <div className="flex flex-1 flex-col items-center justify-center text-center">
                <div className="mb-8 grid h-28 w-28 place-items-center rounded-full border border-bronze-light/40 text-bronze-light md:h-32 md:w-32">
                  <svg
                    width="58"
                    height="58"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.8"
                    aria-hidden="true"
                  >
                    <path d="M12 1v22M1 12h22M4 4l16 16M20 4 4 20" />
                    <circle cx="12" cy="12" r="7.5" />
                  </svg>
                </div>
                <p className="max-w-sm font-display text-5xl font-medium leading-[0.95] text-paper md:text-6xl">
                  Cada foto
                  <span className="block font-normal italic text-bronze-light">é única.</span>
                </p>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-paper/50">
                  E toda memória merece ser preservada com cuidado, sensibilidade e respeito.
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 pt-5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-paper/35">
                <span>Origem Restauro</span>
                <span>Memórias preservadas</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
            Como funciona
          </p>
          <h2 className="text-balance font-display text-5xl font-medium leading-[0.96] tracking-tight text-ink md:text-7xl">
            Simples para você.
            <span className="block font-normal italic text-bronze">Minucioso para nós.</span>
          </h2>

          <ol className="mt-12">
            {steps.map(([title, text], index) => (
              <li
                key={title}
                className="grid grid-cols-[auto_1fr] gap-5 border-t border-ink/10 py-6"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink font-display italic text-paper">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-ink">{title}</h3>
                  <p className="mt-2 max-w-lg leading-relaxed text-warm-brown">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const testimonials = [
    {
      quote:
        'Minha avó chorou de emoção ao ver a foto do casamento dela restaurada. Foi como recuperar um pedaço da nossa família.',
      name: 'Maria Aparecida',
      location: 'São Paulo, SP',
    },
    {
      quote:
        'A foto do meu pai estava manchada e desbotada. O resultado preservou a essência e trouxe detalhes que eu nunca tinha visto.',
      name: 'Roberto Ferreira',
      location: 'Belo Horizonte, MG',
    },
    {
      quote:
        'A colorização ficou tão natural que parecia que a fotografia sempre havia sido assim. Um trabalho muito sensível.',
      name: 'Ana Lúcia',
      location: 'Curitiba, PR',
    },
  ]

  return (
    <section id="depoimentos" className="bg-sand px-6 py-28 md:py-36">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              Quem confia, sente
            </p>
            <h2 className="max-w-3xl text-balance font-display text-5xl font-medium leading-[0.96] text-ink md:text-7xl">
              Memórias que voltaram
              <span className="font-normal italic text-bronze"> a respirar.</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-bronze" aria-label="Avaliação máxima">
            {Array.from({ length: 5 }).map((_, index) => (
              <Icon key={index} name="star" size={18} />
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <blockquote
              key={testimonial.name}
              className={`flex min-h-80 flex-col justify-between rounded-[2rem] border p-8 ${
                index === 1 ? 'border-ink bg-ink text-paper' : 'border-ink/10 bg-paper text-ink'
              }`}
            >
              <span
                className={`font-display text-7xl leading-none ${
                  index === 1 ? 'text-bronze-light' : 'text-bronze'
                }`}
              >
                “
              </span>
              <p
                className={`mt-4 text-lg leading-relaxed ${
                  index === 1 ? 'text-paper/80' : 'text-warm-brown'
                }`}
              >
                {testimonial.quote}
              </p>
              <footer className="mt-8">
                <cite className="not-italic font-bold">{testimonial.name}</cite>
                <p className={`mt-1 text-sm ${index === 1 ? 'text-paper/45' : 'text-muted-brown'}`}>
                  {testimonial.location}
                </p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    [
      'Preciso enviar a fotografia original?',
      'Não. Você pode enviar uma foto bem iluminada ou uma digitalização pelo WhatsApp. Orientamos como captar a melhor imagem possível.',
    ],
    [
      'Quanto custa uma restauração?',
      'O valor depende do nível de dano, da quantidade de pessoas e do acabamento desejado. A análise inicial é gratuita.',
    ],
    [
      'Quanto tempo leva?',
      'O prazo é informado após a análise da complexidade. Assim, você recebe uma previsão clara antes de aprovar o serviço.',
    ],
    [
      'Minha fotografia será publicada?',
      'Somente com sua autorização. Respeitamos a privacidade e tratamos cada imagem como uma memória particular.',
    ],
  ]

  return (
    <section className="bg-paper px-6 py-28 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.7fr_1fr]">
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
            Dúvidas frequentes
          </p>
          <h2 className="font-display text-5xl font-medium leading-none text-ink md:text-6xl">
            Antes de enviar
            <span className="block font-normal italic text-bronze">sua fotografia.</span>
          </h2>
          <p className="mt-6 max-w-sm leading-relaxed text-warm-brown">
            Ainda ficou alguma dúvida? Fale diretamente com a gente pelo WhatsApp.
          </p>
        </div>

        <div className="border-t border-ink/15">
          {items.map(([question, answer]) => (
            <details key={question} className="group border-b border-ink/15">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-bold text-ink">
                {question}
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-ink/15 transition-all group-open:rotate-45 group-open:bg-ink group-open:text-paper">
                  <Icon name="plus" size={18} />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 pr-14 leading-relaxed text-warm-brown">{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section id="contato" className="bg-paper px-4 pb-4 md:px-6 md:pb-6">
      <div className="noise relative mx-auto max-w-[96rem] overflow-hidden rounded-[2.5rem] bg-ink px-6 py-24 text-center md:rounded-[3.5rem] md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-bronze/20 blur-[100px]" />
        <div className="relative mx-auto max-w-4xl">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.24em] text-bronze-light">
            Sua história merece continuar
          </p>
          <h2 className="text-balance font-display text-5xl font-medium leading-[0.9] tracking-tight text-paper md:text-8xl">
            Vamos devolver vida
            <span className="block font-normal italic text-bronze-light">à sua memória?</span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-paper/55">
            Envie sua foto para uma análise gratuita e receba um orçamento personalizado, sem
            compromisso.
          </p>
          <a
            href="/enviar-fotos"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-bronze px-8 py-5 font-bold text-white transition-all hover:-translate-y-1 hover:bg-bronze-light hover:shadow-[0_16px_50px_rgba(182,123,66,0.35)]"
          >
            <Icon name="upload" size={22} />
            Enviar minhas fotos
            <Icon name="arrowRight" size={19} />
          </a>
          <p className="mt-5 text-sm text-paper/40">
            (62) 99304-0004 · Atendimento online para todo o Brasil
          </p>

          <div className="mx-auto mt-9 flex max-w-md flex-col items-stretch justify-center gap-3 border-t border-white/10 pt-8 sm:flex-row">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 font-semibold text-paper transition-all hover:-translate-y-0.5 hover:border-bronze-light hover:bg-white/10"
              aria-label="Visitar o Instagram da Origem Restauro"
            >
              <Icon name="instagram" size={19} />
              Instagram
              <Icon name="arrowUpRight" size={15} />
            </a>
            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-3 rounded-full border border-white/15 bg-white/[0.04] px-6 py-4 font-semibold text-paper transition-all hover:-translate-y-0.5 hover:border-bronze-light hover:bg-white/10"
              aria-label="Visitar o Facebook da Origem Restauro"
            >
              <Icon name="facebook" size={19} />
              Facebook
              <Icon name="arrowUpRight" size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-paper px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col justify-between gap-8 border-b border-ink/10 pb-8 md:flex-row md:items-center">
          <Brand />
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium text-warm-brown">
            <a href="#servicos" className="hover:text-ink">
              Serviços
            </a>
            <a href="#portfolio" className="hover:text-ink">
              Portfólio
            </a>
            <a href="#processo" className="hover:text-ink">
              Processo
            </a>
            <a href="#depoimentos" className="hover:text-ink">
              Depoimentos
            </a>
          </div>
          <div className="flex gap-2">
            <SocialLink href={INSTAGRAM} label="Instagram" icon="instagram" />
            <SocialLink href={FACEBOOK} label="Facebook" icon="facebook" />
            <SocialLink href={whatsappLink()} label="WhatsApp" icon="whatsapp" />
          </div>
        </div>
        <div className="flex flex-col justify-between gap-2 text-xs text-muted-brown md:flex-row">
          <p>© {new Date().getFullYear()} Origem Restauro. Todos os direitos reservados.</p>
          <p>Memórias preservadas com técnica e sensibilidade.</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 text-ink transition-all hover:border-bronze hover:bg-bronze hover:text-white"
    >
      {icon === 'whatsapp' ? <WhatsAppIcon size={18} /> : <Icon name={icon} size={18} />}
    </a>
  )
}

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Solicitar orçamento pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25d366] text-white shadow-[0_12px_35px_rgba(37,211,102,0.35)] transition-transform hover:scale-105 md:hidden"
    >
      <WhatsAppIcon size={25} />
    </a>
  )
}

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    arrowRight: <path d="M5 12h14M14 7l5 5-5 5" />,
    arrowDown: <path d="M12 5v14M7 14l5 5 5-5" />,
    arrowUpRight: <path d="M7 17 17 7M7 7h10v10" />,
    menu: <path d="M4 8h16M4 16h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M12 5v14M5 12h14" />,
    upload: <path d="M12 16V4M7 9l5-5 5 5M5 14v5h14v-5" />,
    compare: <path d="m8 6-4 6 4 6M16 6l4 6-4 6" />,
    restore: <path d="M4 7h16v12H4zM8 7V4h8v3M8 12l2-2 3 3 2-2 3 3" />,
    color: (
      <path d="M12 3a9 9 0 1 0 0 18h1.5a1.5 1.5 0 0 0 0-3H12a2 2 0 0 1 0-4h2a7 7 0 0 0-2-11ZM7.5 11h.01M9 7.5h.01M13 6.5h.01M16.5 9h.01" />
    ),
    enhance: (
      <path d="m12 3 1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3ZM18 15l.75 2.25L21 18l-2.25.75L18 21l-.75-2.25L15 18l2.25-.75L18 15Z" />
    ),
    scan: <path d="M8 3H4v4M16 3h4v4M8 21H4v-4M16 21h4v-4M7 12h10" />,
    print: <path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7zM17 11h.01" />,
    star: (
      <path d="m12 3 2.75 5.58L21 9.49l-4.5 4.39 1.06 6.2L12 17.15l-5.56 2.93 1.06-6.2L3 9.49l6.25-.91L12 3Z" />
    ),
    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </>
    ),
    facebook: <path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1Z" />,
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884M20.463 3.488A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

export default function App() {
  return (
    <div className="min-h-screen overflow-clip bg-paper">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <Portfolio />
        <Process />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  )
}
