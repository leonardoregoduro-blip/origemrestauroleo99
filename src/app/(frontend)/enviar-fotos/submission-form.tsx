'use client'

import { useRef, useState } from 'react'

type SubmissionResult = {
  success: boolean
  message: string
  protocol?: string
}

export function SubmissionForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<SubmissionResult | null>(null)

  const updateFiles = (fileList: FileList | null) => {
    if (!fileList) return
    setFiles(Array.from(fileList).slice(0, 5))
    setResult(null)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setResult(null)

    if (files.length === 0) {
      setResult({ success: false, message: 'Selecione pelo menos uma fotografia.' })
      return
    }

    setPending(true)
    const formData = new FormData(event.currentTarget)
    formData.delete('photos')
    files.forEach((file) => formData.append('photos', file))

    try {
      const response = await fetch('/enviar-fotos/solicitar', {
        method: 'POST',
        body: formData,
      })
      const data = (await response.json()) as SubmissionResult
      setResult(data)

      if (response.ok && data.success) {
        formRef.current?.reset()
        setFiles([])
      }
    } catch {
      setResult({
        success: false,
        message: 'Não foi possível enviar agora. Verifique sua conexão e tente novamente.',
      })
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-ink/10 bg-cream p-6 shadow-[0_24px_70px_rgba(24,20,17,0.10)] md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Seu nome" name="name" placeholder="Nome completo" required />
        <Field
          label="WhatsApp"
          name="phone"
          placeholder="(62) 99999-9999"
          inputMode="tel"
          required
        />
        <Field label="E-mail" name="email" placeholder="voce@email.com" type="email" />
        <Field label="Cidade" name="city" placeholder="Cidade e estado" />
      </div>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-bold text-ink">Qual serviço você procura?</span>
        <select
          name="service"
          required
          defaultValue=""
          className="h-13 w-full rounded-xl border border-ink/10 bg-white/65 px-4 text-ink outline-none transition focus:border-bronze focus:ring-4 focus:ring-bronze/10"
        >
          <option value="" disabled>
            Selecione uma opção
          </option>
          <option value="restoration">Restauração completa</option>
          <option value="colorization">Colorização</option>
          <option value="enhancement">Melhoria de qualidade</option>
          <option value="unsure">Ainda não sei</option>
        </select>
      </label>

      <label className="mt-5 block">
        <span className="mb-2 block text-sm font-bold text-ink">Conte sobre a fotografia</span>
        <textarea
          name="description"
          rows={4}
          maxLength={3000}
          placeholder="Descreva manchas, rasgos, partes apagadas ou o resultado que você deseja..."
          className="w-full resize-none rounded-xl border border-ink/10 bg-white/65 px-4 py-3 text-ink outline-none transition placeholder:text-muted-brown/60 focus:border-bronze focus:ring-4 focus:ring-bronze/10"
        />
      </label>

      <div className="mt-6">
        <span className="mb-2 block text-sm font-bold text-ink">Fotografias para análise</span>
        <label
          className={`flex min-h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed px-6 text-center transition ${
            dragging
              ? 'border-bronze bg-bronze/10'
              : 'border-ink/20 bg-white/35 hover:border-bronze'
          }`}
          onDragEnter={(event) => {
            event.preventDefault()
            setDragging(true)
          }}
          onDragOver={(event) => event.preventDefault()}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setDragging(false)
            updateFiles(event.dataTransfer.files)
          }}
        >
          <input
            type="file"
            name="photos"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={(event) => updateFiles(event.target.files)}
          />
          <span className="grid h-12 w-12 place-items-center rounded-full bg-ink text-paper">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path d="M12 16V4M7 9l5-5 5 5M5 14v5h14v-5" />
            </svg>
          </span>
          <strong className="mt-4 text-ink">Clique para selecionar suas fotos</strong>
          <span className="mt-1 text-sm text-muted-brown">
            ou arraste os arquivos para esta área
          </span>
        </label>

        {files.length > 0 && (
          <ul className="mt-4 space-y-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${file.lastModified}`}
                className="flex items-center justify-between gap-4 rounded-xl border border-ink/10 bg-white/45 px-4 py-3 text-sm"
              >
                <span className="min-w-0 truncate font-medium text-ink">{file.name}</span>
                <button
                  type="button"
                  onClick={() =>
                    setFiles((current) => current.filter((_, fileIndex) => fileIndex !== index))
                  }
                  className="shrink-0 text-xs font-bold uppercase tracking-wider text-bronze hover:text-ink"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <label className="mt-6 flex items-start gap-3 text-sm leading-relaxed text-warm-brown">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-ink/20 accent-bronze"
        />
        Autorizo o uso dos meus dados e imagens exclusivamente para análise e contato sobre este
        pedido.
      </label>

      {result && (
        <div
          className={`mt-6 rounded-xl border px-4 py-4 text-sm ${
            result.success
              ? 'border-emerald-700/20 bg-emerald-700/10 text-emerald-900'
              : 'border-red-700/20 bg-red-700/10 text-red-900'
          }`}
          role="status"
        >
          <strong className="block">
            {result.success ? 'Pedido recebido' : 'Verifique os dados'}
          </strong>
          <span className="mt-1 block">{result.message}</span>
          {result.protocol && (
            <span className="mt-2 block font-bold">Protocolo: {result.protocol}</span>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-full bg-ink px-7 py-5 font-bold text-paper transition-all hover:-translate-y-0.5 hover:bg-bronze disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? 'Enviando fotografias...' : 'Enviar fotos para análise'}
        {!pending && (
          <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M5 12h14M14 7l5 5-5 5" />
          </svg>
        )}
      </button>
      <p className="mt-4 text-center text-xs text-muted-brown">
        Seus arquivos não ficam públicos e só podem ser acessados pela equipe da Origem Restauro.
      </p>
    </form>
  )
}

function Field({
  label,
  name,
  placeholder,
  required = false,
  type = 'text',
  inputMode,
}: {
  label: string
  name: string
  placeholder: string
  required?: boolean
  type?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode']
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        maxLength={type === 'email' ? 180 : 120}
        placeholder={placeholder}
        className="h-13 w-full rounded-xl border border-ink/10 bg-white/65 px-4 text-ink outline-none transition placeholder:text-muted-brown/60 focus:border-bronze focus:ring-4 focus:ring-bronze/10"
      />
    </label>
  )
}
