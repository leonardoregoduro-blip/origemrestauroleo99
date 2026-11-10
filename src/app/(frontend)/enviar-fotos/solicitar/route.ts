import { getPayloadClient } from '@/lib/payload'

export const runtime = 'nodejs'

const allowedServices = new Set(['restoration', 'colorization', 'enhancement', 'unsure'])
const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp'])
const maxFiles = 5
const maxFileSize = 10 * 1024 * 1024
const maxRequestSize = maxFiles * maxFileSize + 1024 * 1024

function text(formData: FormData, field: string, maxLength: number) {
  const value = formData.get(field)
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > maxRequestSize) {
    return Response.json(
      { success: false, message: 'Os arquivos ultrapassam o limite total permitido.' },
      { status: 413 },
    )
  }

  try {
    const formData = await request.formData()

    if (text(formData, 'website', 200)) {
      return Response.json({ success: true, message: 'Pedido recebido para análise.' })
    }

    const name = text(formData, 'name', 120)
    const phone = text(formData, 'phone', 24)
    const email = text(formData, 'email', 180)
    const city = text(formData, 'city', 120)
    const service = text(formData, 'service', 32)
    const description = text(formData, 'description', 3000)
    const consent = formData.get('consent')
    const files = formData
      .getAll('photos')
      .filter((value): value is File => value instanceof File && value.size > 0)

    if (name.length < 2) {
      return Response.json(
        { success: false, message: 'Informe seu nome completo.' },
        { status: 400 },
      )
    }

    if (!/^[\d\s()+-]{10,24}$/.test(phone)) {
      return Response.json(
        { success: false, message: 'Informe um WhatsApp válido.' },
        { status: 400 },
      )
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { success: false, message: 'Informe um e-mail válido.' },
        { status: 400 },
      )
    }

    if (!allowedServices.has(service)) {
      return Response.json(
        { success: false, message: 'Selecione o serviço desejado.' },
        { status: 400 },
      )
    }

    if (consent !== 'on') {
      return Response.json(
        { success: false, message: 'É necessário autorizar a análise das fotografias.' },
        { status: 400 },
      )
    }

    if (files.length === 0 || files.length > maxFiles) {
      return Response.json(
        { success: false, message: 'Envie entre uma e cinco fotografias.' },
        { status: 400 },
      )
    }

    for (const file of files) {
      if (!allowedMimeTypes.has(file.type)) {
        return Response.json(
          { success: false, message: 'Envie somente imagens JPG, PNG ou WebP.' },
          { status: 400 },
        )
      }
      if (file.size > maxFileSize) {
        return Response.json(
          { success: false, message: `A imagem “${file.name}” ultrapassa o limite de 10 MB.` },
          { status: 400 },
        )
      }
    }

    const payload = await getPayloadClient()
    const submissionToken = crypto.randomUUID()
    const restorationRequest = await payload.create({
      collection: 'restoration-requests',
      overrideAccess: false,
      data: {
        name,
        phone,
        email: email || undefined,
        city: city || undefined,
        service: service as 'restoration' | 'colorization' | 'enhancement' | 'unsure',
        description: description || undefined,
        submissionToken,
      },
    })

    for (const [index, file] of files.entries()) {
      const safeName =
        file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(-120) || `foto-${index + 1}.jpg`
      await payload.create({
        collection: 'restoration-photos',
        overrideAccess: false,
        data: {
          alt: `Foto ${index + 1} enviada por ${name}`,
          request: restorationRequest.id,
          submissionToken,
        },
        file: {
          data: Buffer.from(await file.arrayBuffer()),
          mimetype: file.type,
          name: safeName,
          size: file.size,
        },
      })
    }

    const protocol = `OR-${String(restorationRequest.id).slice(-6).toUpperCase()}`
    return Response.json({
      success: true,
      message: 'Suas fotos foram enviadas. Entraremos em contato pelo WhatsApp após a análise.',
      protocol,
    })
  } catch {
    return Response.json(
      {
        success: false,
        message: 'Não foi possível concluir o envio. Tente novamente em alguns instantes.',
      },
      { status: 500 },
    )
  }
}
