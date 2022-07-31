import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const nuevaOrden = await prisma.orden.create({
      data: {
        orden: req.body.pedido,
        fecha: req.body.fecha,
        nombre: req.body.nombre,
        total: req.body.total,
      },
    });

    res.json(nuevaOrden);
  }else{
    const orders = await prisma.orden.findMany();
    res.status(200).json(orders);
  }
}
