import type { Access, CollectionConfig, FieldAccess } from 'payload'

const isPayloadAdmin: Access = ({ req }) => req.user?.collection === 'admins'
const isPayloadAdminField: FieldAccess = ({ req }) => req.user?.collection === 'admins'

export const RestorationRequests: CollectionConfig = {
  slug: 'restoration-requests',
  labels: {
    singular: 'Pedido de restauração',
    plural: 'Pedidos de restauração',
  },
  admin: {
    useAsTitle: 'name',
    group: 'Pedidos',
    defaultColumns: ['name', 'phone', 'service', 'status', 'createdAt'],
    description: 'Solicitações e fotografias enviadas pelos clientes através do site.',
  },
  access: {
    create: () => true,
    read: isPayloadAdmin,
    update: isPayloadAdmin,
    delete: isPayloadAdmin,
    admin: ({ req }) => req.user?.collection === 'admins',
  },
  defaultSort: '-createdAt',
  fields: [
    {
      name: 'name',
      label: 'Nome do cliente',
      type: 'text',
      required: true,
      maxLength: 120,
    },
    {
      name: 'phone',
      label: 'WhatsApp',
      type: 'text',
      required: true,
      maxLength: 24,
    },
    {
      name: 'email',
      label: 'E-mail',
      type: 'email',
    },
    {
      name: 'city',
      label: 'Cidade',
      type: 'text',
      maxLength: 120,
    },
    {
      name: 'service',
      label: 'Serviço desejado',
      type: 'select',
      required: true,
      options: [
        { label: 'Restauração completa', value: 'restoration' },
        { label: 'Colorização', value: 'colorization' },
        { label: 'Melhoria de qualidade', value: 'enhancement' },
        { label: 'Ainda não sei', value: 'unsure' },
      ],
    },
    {
      name: 'description',
      label: 'O que aconteceu com a foto?',
      type: 'textarea',
      maxLength: 3000,
    },
    {
      name: 'photos',
      label: 'Fotos enviadas',
      type: 'join',
      collection: 'restoration-photos',
      on: 'request',
      admin: {
        allowCreate: false,
      },
    },
    {
      name: 'status',
      label: 'Status do pedido',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Novo', value: 'new' },
        { label: 'Em análise', value: 'reviewing' },
        { label: 'Orçamento enviado', value: 'quoted' },
        { label: 'Em restauração', value: 'in-progress' },
        { label: 'Concluído', value: 'completed' },
        { label: 'Cancelado', value: 'cancelled' },
      ],
      access: {
        create: () => false,
        update: isPayloadAdminField,
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      label: 'Anotações internas',
      type: 'textarea',
      access: {
        create: () => false,
        read: isPayloadAdminField,
        update: isPayloadAdminField,
      },
      admin: {
        position: 'sidebar',
      },
    },
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
