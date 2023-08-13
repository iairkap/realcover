import prisma from "../../../../../prisma/client";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const updatedData = req.body;
      const updatedCoupon = await prisma.coupon.update({
        where: { id: Number(id) },
        data: updatedData,
      });
      res.status(200).json(updatedCoupon);
    } catch (error) {
      res.status(500).json({ error: "Error al modificar el cupón." });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.coupon.delete({ where: { id: Number(id) } });
      res.status(200).json({ message: "Cupón eliminado con éxito." });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar el cupón." });
    }
  } else {
    res.status(405).end(); // Método no permitido
  }
}
