import { prisma } from '@/lib/prisma'
import fastify from 'fastify'

const app = fastify()

app.get('/', async () => {
  const users = prisma.user.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return users
})

// Change to bind to 0.0.0.0
app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
  console.log('🚀 HTTP server running on http://localhost:3000')
})
