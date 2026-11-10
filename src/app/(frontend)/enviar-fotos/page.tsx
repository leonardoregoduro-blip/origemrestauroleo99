import type { Metadata } from 'next'
import Link from 'next/link'
import { SubmissionForm } from './submission-form'

export const metadata: Metadata = {
  title: 'Enviar fotos para restauração | Origem Restauro',
  description:
    'Envie suas fotografias antigas ou danificadas para uma análise gratuita da Origem Restauro.',
}

function BrandMark() {
  return (
    <span className="flex items-center gap-3">
      <span
        className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 text-bronze"
        aria-hidden="true"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2v20M2 12h20M5 5l14 14M19 5 5 19" />
        </svg>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight text-ink">
        Origem <span className="font-normal italic">Restauro</span>
      </span>
    </span>
  )
}

export default function SendPhotosPage() {
  return (
    <main className="noise relative min-h-screen bg-paper px-5 py-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex items-center justify-between">
          <Link href="/" aria-label="Voltar para a página inicial">
            <BrandMark />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/35 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-white/70"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M19 12H5M10 7l-5 5 5 5" />
            </svg>
            Voltar ao site
          </Link>
        </header>

        <div className="grid gap-12 py-16 lg:grid-cols-[0.72fr_1fr] lg:items-start lg:py-20">
          <section className="lg:sticky lg:top-10">
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-bronze">
              Análise gratuita
            </p>
            <h1 className="text-balance font-display text-5xl font-medium leading-[0.92] tracking-tight text-ink md:text-7xl">
              Envie sua foto.
              <span className="block font-normal italic text-bronze">
                Nós cuidamos da história.
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-warm-brown">
              Conte o que aconteceu e envie até cinco imagens. Nossa equipe avaliará cada detalhe e
              entrará em contato pelo WhatsApp.
            </p>

            <div className="mt-10 space-y-4 border-t border-ink/10 pt-8">
              {[
                'Seus arquivos ficam privados',
                'Aceitamos JPG, PNG e WebP',
                'Até 5 fotos, com 10 MB cada',
                'Orçamento sem compromisso',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm font-medium text-ink">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-bronze/15 text-bronze">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </section>

          <SubmissionForm />
        </div>
      </div>
    </main>
  )
}
