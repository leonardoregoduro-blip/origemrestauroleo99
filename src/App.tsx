import { useState, useEffect, useRef } from "react";

const WHATSAPP = "5562993040004";
const INSTAGRAM = "https://www.instagram.com/origemrestauro";
const FACEBOOK = "https://www.facebook.com/OrigemRestauro";

function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Início", href: "#hero" },
    { label: "Serviços", href: "#services" },
    { label: "Antes & Depois", href: "#gallery" },
    { label: "Depoimentos", href: "#testimonials" },
    { label: "Contato", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#faf7f2]/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-[#c9923a] text-2xl">✦</span>
          <span
            className="font-serif text-xl font-semibold tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            Origem Restauro
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide transition-colors hover:text-[#c9923a]"
              style={{ color: "#6b3e26" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm font-semibold rounded-full transition-all hover:scale-105"
            style={{ background: "#c9923a", color: "#faf7f2" }}
          >
            Solicitar Orçamento
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
          style={{ color: "#3d2b1f" }}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4" style={{ background: "#faf7f2" }}>
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-base font-medium py-1 border-b"
              style={{ color: "#3d2b1f", borderColor: "#d9cfc0" }}
            >
              {l.label}
            </a>
          ))}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 px-5 py-3 text-center text-sm font-semibold rounded-full"
            style={{ background: "#c9923a", color: "#faf7f2" }}
          >
            Solicitar Orçamento
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #2a1a10 0%, #3d2b1f 50%, #1a0f0a 100%)" }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9923a' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 hidden lg:block">
        <img
          src="https://images.unsplash.com/photo-1699699834386-c123f63dc03e?w=900&h=1200&fit=crop&auto=format"
          alt="Fotografia antiga restaurada"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to right, #2a1a10 0%, transparent 60%)" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-32 grid lg:grid-cols-2 items-center gap-12">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12" style={{ background: "#c9923a" }} />
            <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c9923a" }}>
              Restauração Fotográfica Profissional
            </span>
          </div>

          <h1
            className="text-5xl lg:text-7xl font-bold leading-none mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf7f2" }}
          >
            Reviva suas
            <br />
            <em className="italic" style={{ color: "#c9923a" }}>memórias</em>
            <br />
            mais preciosas
          </h1>

          <p className="text-lg leading-relaxed mb-10 max-w-md" style={{ color: "#c9b89a" }}>
            Recuperamos e revitalizamos fotografias antigas, desgastadas e danificadas — devolvendo detalhes, cores
            e a história que o tempo tentou apagar.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Olá! Gostaria de um orçamento para restauração de fotos.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 font-semibold rounded-full transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "#c9923a", color: "#1a0f0a" }}
            >
              <WhatsAppIcon />
              Fale Conosco no WhatsApp
            </a>
            <a
              href="#gallery"
              className="inline-flex items-center gap-2 px-7 py-4 font-semibold rounded-full border-2 transition-all hover:scale-105"
              style={{ borderColor: "#c9b89a", color: "#faf7f2" }}
            >
              Ver Antes & Depois
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#c9b89a" }}>
        <span className="text-xs tracking-widest uppercase">Rolar</span>
        <div className="w-px h-8 opacity-50" style={{ background: "#c9923a" }} />
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: "🖼️",
      title: "Restauração de Danos",
      desc: "Reparamos rasgos, manchas, riscos, dobras e danos causados pelo tempo em fotografias impressas.",
    },
    {
      icon: "🎨",
      title: "Colorização",
      desc: "Transformamos fotos em preto e branco em imagens coloridas com naturalidade e fidelidade histórica.",
    },
    {
      icon: "✨",
      title: "Melhora de Qualidade",
      desc: "Aumentamos a nitidez, recuperamos detalhes perdidos e melhoramos a exposição de fotos antigas.",
    },
    {
      icon: "🖨️",
      title: "Impressão Premium",
      desc: "Imprimimos as fotos restauradas em papel fotográfico de alta qualidade para durar décadas.",
    },
    {
      icon: "📱",
      title: "Digitalização",
      desc: "Digitalizamos em alta resolução para que suas memórias existam com segurança em formato digital.",
    },
    {
      icon: "💌",
      title: "Presentes Personalizados",
      desc: "Criamos quadros, álbuns e produtos personalizados com as fotos restauradas para presentear.",
    },
  ];

  return (
    <section id="services" className="py-24 px-6" style={{ background: "#f5f0e8" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c9923a" }}>
            O que fazemos
          </span>
          <h2
            className="mt-3 text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            Nossos Serviços
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5" style={{ background: "#c9923a" }} />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-8 rounded-2xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              style={{ background: "#faf7f2", borderColor: "#d9cfc0" }}
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
              >
                {s.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "#6b3e26" }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterCard({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getPos = (clientX: number) => {
    if (!ref.current) return 50;
    const { left, width } = ref.current.getBoundingClientRect();
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100));
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={ref}
        className="relative overflow-hidden rounded-xl cursor-col-resize select-none"
        style={{ aspectRatio: "4/3", background: "#d9cfc0" }}
        onMouseDown={() => (dragging.current = true)}
        onMouseMove={(e) => dragging.current && setPos(getPos(e.clientX))}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchMove={(e) => setPos(getPos(e.touches[0].clientX))}
      >
        <img src={after} alt="Depois" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
          <img
            src={before}
            alt="Antes"
            className="absolute inset-0 object-cover"
            style={{ width: ref.current?.getBoundingClientRect().width ?? 400, height: "100%" }}
          />
          <div
            className="absolute inset-y-0 right-0 opacity-60"
            style={{ width: 1, background: "#c9923a" }}
          />
        </div>
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full flex items-center justify-center shadow-lg"
          style={{ left: `${pos}%`, background: "#c9923a", color: "#faf7f2" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3L1 8l4 5M11 3l4 5-4 5" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
        <span
          className="absolute top-3 left-3 text-xs font-bold px-2 py-1 rounded"
          style={{ background: "rgba(0,0,0,0.6)", color: "#faf7f2" }}
        >
          ANTES
        </span>
        <span
          className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded"
          style={{ background: "rgba(201,146,58,0.85)", color: "#1a0f0a" }}
        >
          DEPOIS
        </span>
      </div>
      <p className="text-center text-sm font-medium" style={{ color: "#6b3e26" }}>
        {label}
      </p>
    </div>
  );
}

function Gallery() {
  const pairs = [
    {
      before: "/src/imports/photo_4949531736983407752_y.jpg",
      after: "/src/imports/photo_4949531736983407753_y.jpg",
      label: "Foto em combate 2014",
    },
    {
      before: "/src/imports/photo_4949531736983407750_y-1.jpg",
      after: "/src/imports/photo_4949531736983407750_y__1_.jpg",
      label: "Foto em família 2011",
    },
    {
      before: "/src/imports/photo_4949531736983407761_x.jpg",
      after: "/src/imports/photo_4949531736983407761_x__1_.jpg",
      label: "Foto em família de aniversário 2008",
    },
  ];

  return (
    <section id="gallery" className="py-24 px-6" style={{ background: "#faf7f2" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c9923a" }}>
            Resultados reais
          </span>
          <h2
            className="mt-3 text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            Antes & Depois
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5" style={{ background: "#c9923a" }} />
          <p className="mt-6 text-base max-w-xl mx-auto" style={{ color: "#8c6e5d" }}>
            Arraste o controle deslizante para comparar cada foto antes e depois da restauração.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {pairs.map((p) => (
            <BeforeAfterCard key={p.label} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    {
      name: "Maria Aparecida Santos",
      location: "São Paulo, SP",
      text: "Minha avó chorou de emoção ao ver a foto do casamento dela restaurada. Ela tinha perdido a esperança de ver aquela imagem novamente. Trabalho incrível!",
      stars: 5,
    },
    {
      name: "Roberto Ferreira",
      location: "Belo Horizonte, MG",
      text: "Tinha uma foto do meu pai de quando era criança, completamente manchada e desbotada. Devolveram ela como nova. Qualidade excepcional e atendimento muito atencioso.",
      stars: 5,
    },
    {
      name: "Ana Lúcia Oliveira",
      location: "Curitiba, PR",
      text: "Encomendei a colorização de fotos em preto e branco dos meus avós. O resultado ficou tão natural que parecia que as fotos sempre foram coloridas. Recomendo demais!",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-24 px-6" style={{ background: "#3d2b1f" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c9923a" }}>
            Histórias reais
          </span>
          <h2
            className="mt-3 text-4xl lg:text-5xl font-bold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf7f2" }}
          >
            O que nossos clientes dizem
          </h2>
          <div className="mt-4 mx-auto w-16 h-0.5" style={{ background: "#c9923a" }} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div
              key={t.name}
              className="p-8 rounded-2xl"
              style={{ background: "#2a1a10", border: "1px solid #4d3525" }}
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} style={{ color: "#c9923a" }}>★</span>
                ))}
              </div>
              <p className="text-base leading-relaxed mb-6 italic" style={{ color: "#c9b89a" }}>
                "{t.text}"
              </p>
              <div>
                <p className="font-semibold" style={{ color: "#faf7f2" }}>{t.name}</p>
                <p className="text-sm" style={{ color: "#8c6e5d" }}>{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <section className="py-16 px-6" style={{ background: "#c9923a" }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {[
          { num: "+2.000", label: "Fotos Restauradas" },
          { num: "8 anos", label: "de Experiência" },
          { num: "98%", label: "Clientes Satisfeitos" },
          { num: "48h", label: "Prazo Médio" },
        ].map((s) => (
          <div key={s.label}>
            <p
              className="text-4xl font-bold mb-1"
              style={{ fontFamily: "'Playfair Display', serif", color: "#1a0f0a" }}
            >
              {s.num}
            </p>
            <p className="text-sm font-medium" style={{ color: "#5a2e0a" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: "#f5f0e8" }}>
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: "#c9923a" }}>
            Entre em contato
          </span>
          <h2
            className="mt-3 text-4xl lg:text-5xl font-bold leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
          >
            Vamos recuperar
            <br />
            sua história juntos
          </h2>
          <p className="text-base leading-relaxed mb-8 max-w-md" style={{ color: "#6b3e26" }}>
            Envie uma mensagem pelo WhatsApp ou nas redes sociais. Nossa equipe irá analisar sua foto e enviar um
            orçamento sem compromisso em até 2 horas.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href={`https://wa.me/${WHATSAPP}?text=Olá! Gostaria de um orçamento para restauração de fotos.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "#25d366", color: "#fff", maxWidth: 340 }}
            >
              <WhatsAppIcon size={24} />
              <span>
                <span className="block text-xs font-normal opacity-80">Fale conosco agora</span>
                WhatsApp
              </span>
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                color: "#fff",
                maxWidth: 340,
              }}
            >
              <InstagramIcon size={24} />
              <span>
                <span className="block text-xs font-normal opacity-80">Nos acompanhe</span>
                Instagram
              </span>
            </a>

            <a
              href={FACEBOOK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all hover:scale-105 hover:shadow-lg"
              style={{ background: "#1877f2", color: "#fff", maxWidth: 340 }}
            >
              <FacebookIcon size={24} />
              <span>
                <span className="block text-xs font-normal opacity-80">Nos siga</span>
                Facebook
              </span>
            </a>
          </div>
        </div>

        <div
          className="rounded-3xl overflow-hidden shadow-xl"
          style={{ border: "1px solid #d9cfc0" }}
        >
          <img
            src="https://images.unsplash.com/photo-1565893089337-4680bbb1f34e?w=700&h=500&fit=crop&auto=format"
            alt="Fotos antigas em mesa de madeira"
            className="w-full h-64 object-cover"
          />
          <div className="p-8" style={{ background: "#faf7f2" }}>
            <h3
              className="text-xl font-semibold mb-4"
              style={{ fontFamily: "'Playfair Display', serif", color: "#3d2b1f" }}
            >
              Como funciona?
            </h3>
            <ol className="flex flex-col gap-3">
              {[
                "Envie a foto pelo WhatsApp ou redes sociais",
                "Receba um orçamento personalizado sem compromisso",
                "Aprovando, iniciamos a restauração em até 24h",
                "Entregamos o arquivo digital em alta resolução",
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5"
                    style={{ background: "#c9923a", color: "#1a0f0a" }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: "#6b3e26" }}>
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 px-6" style={{ background: "#1a0f0a" }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span style={{ color: "#c9923a" }}>✦</span>
          <span
            className="text-lg font-semibold"
            style={{ fontFamily: "'Playfair Display', serif", color: "#faf7f2" }}
          >
            Origem Restauro
          </span>
        </div>
        <p className="text-xs" style={{ color: "#8c6e5d" }}>
          © {new Date().getFullYear()} Origem Restauro. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="transition-opacity hover:opacity-70"
          >
            <WhatsAppIcon size={20} color="#25d366" />
          </a>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="transition-opacity hover:opacity-70"
          >
            <InstagramIcon size={20} color="#e1306c" />
          </a>
          <a
            href={FACEBOOK}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="transition-opacity hover:opacity-70"
          >
            <FacebookIcon size={20} color="#1877f2" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function FacebookIcon({ size = 20, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Stats />
      <Services />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
