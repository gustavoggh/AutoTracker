import "dotenv/config"
import { PrismaClient } from "../generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log("Populando itens de manutenção...")

  await prisma.maintenanceItem.createMany({
    data: [
      { name: "Óleo do Motor",    intervalKm: 10000, intervalMonths: 12 },
      { name: "Filtro de Ar",     intervalKm: 10000, intervalMonths: 12 },
      { name: "Pastilha de Freio", intervalKm: 20000, intervalMonths: 24 },
    ],
    skipDuplicates: true,
  })

  console.log("✅ Itens de manutenção criados com sucesso!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })