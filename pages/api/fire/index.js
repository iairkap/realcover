import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, provider } = req.body;

    if (!email || !name || !provider) {
      return res.status(400).json({ message: "Información incompleta." });
    }

    // Busca al usuario en la base de datos
    let user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // Si el usuario no existe, créalo
    if (!user) {
      user = await prisma.user.create({
        data: {
          email: email,
          name: name,
          provider: provider,
          // Cualquier otro campo necesario debe ser definido aquí
        },
      });
    }

    // Retorna al usuario
    return res.status(200).json(user);
  }

  res.status(405).end(); // Método no permitido si no es POST
}
