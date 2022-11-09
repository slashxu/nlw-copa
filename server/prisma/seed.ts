import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Para criar ou atualizar npx prisma db seed
  const user = await prisma.user.create({
    data:{
      name: 'Johnas',
      email: 'slashxu@gmail.com',
      avatarUrl: 'https://github.com/slashxu.png',
    }
  })

  const pool = await prisma.pool.create({
    data:{
      title: 'TESTE 2',
      code: 'BOL456',
      ownerId: user.id,

      participants: {
        create:{
          userId: user.id
        }
      }
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-10T12:00:00.201Z',
      firstTeamCountryCode: 'DE',
      secondTeamCountryCode: 'JP',
    }
  })

  await prisma.game.create({
    data: {
      date: '2022-11-11T12:00:00.201Z',
      firstTeamCountryCode: 'BR',
      secondTeamCountryCode: 'AR',

      guesses: {
        create: {
          firstTeamPoints: 2,
          secondTeamPoints: 1,

          participant: {
            connect:{
              userId_poolId: {
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
        }
      }
    }
  })

}

main()