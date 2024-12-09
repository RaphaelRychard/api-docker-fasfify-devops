import { prisma } from '@/lib/prisma'
import { faker } from '@faker-js/faker'

async function seed() {
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
    },
  })
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
    },
  })
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
    },
  })
  await prisma.user.create({
    data: {
      name: faker.person.fullName(),
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
  prisma.$disconnect()
})
