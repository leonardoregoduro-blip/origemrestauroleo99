import type { Access, CollectionConfig, FieldAccess, RelationshipField } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const isPayloadAdminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

const requestRelationship: RelationshipField = {
  name: 'request',
  label: 'Pedido',
  type: 'relationship',
  relationTo: 'restoration-requests',
  required: true,
  validate: async (value, { req, siblingData }) => {
    if (!value) return 'O pedido é obrigatório.'

    const requestID = typeof value === 'object' && 'id' in value ? value.id : value
    const submissionToken = (siblingData as { submissionToken?: unknown })?.submissionToken

    if (
      (typeof requestID !== 'string' && typeof requestID !== 'number') ||
      typeof submissionToken !== 'string'
    ) {
      return 'Dados do pedido inválidos.'
    }

    try {
      const request = await req.payload.findByID({
        collection: 'restoration-requests',
        id: requestID,
        depth: 0,
        overrideAccess: true,
        showHiddenFields: true,
      })

      if (request.submissionToken !== submissionToken) {
        return 'A foto não pertence a este pedido.'
      }
    } catch {
      return 'Pedido inválido.'
    }

    return true
  },
}

export const RestorationPhotos: CollectionConfig = {
  slug: 'restoration-photos',
  labels: {
    singular: 'Foto de pedido',
    plural: 'Fotos dos pedidos',
  },
  admin: {
    useAsTitle: 'filename',
    group: 'Pedidos',
    defaultColumns: ['filename', 'request', 'createdAt'],
    description: 'Arquivos privados enviados pelos clientes.',
  },
  access: {
    create: () => true,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
    delete: isPayloadAdmin,
    admin: ({ req }) => req.user?.collection === 'admins',
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    modifyResponseHeaders: ({ headers }) => {
      headers.set('Cache-Control', 'private, no-store')
      return headers
    },
  },
  fields: [
    {
      name: 'alt',
      label: 'Descrição',
      type: 'text',
      required: true,
      maxLength: 180,
    },
    requestRelationship,
    {
      name: 'submissionToken',
      type: 'text',
      required: true,
      access: {
        read: isPayloadAdminField,
        update: () => false,
      },
      admin: {
        hidden: true,
      },
    },
  ],
  timestamps: true,
}
