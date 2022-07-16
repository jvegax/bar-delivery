import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const categories = await prisma.category.findMany({
    // Aplicamos eager loading : carga todos los datos
    include: {
      productos: true,
    }
  });
  res.status(200).json(categories);
}
