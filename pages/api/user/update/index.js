import { getSession } from "next-auth/react";
import prisma from "../../../../prisma/client";

export default async (req, res) => {
  if (req.method !== "PUT") {
    return res.status(405).end();
  }

  // Verifica la sesión
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "No estás autenticado." });
  }

  const userId = session.userId;
  const { address, city, postalCode, phone, provider, cuit, localidad } =
    req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        address,
        city,
        postalCode,
        phone,
        provider,
        cuit,
        localidad,
      },
    });

    return res.json(updatedUser);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
