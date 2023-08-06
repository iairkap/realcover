//api\login-google
import { getSession } from "next-auth/react";
import prisma from "../../../prisma/client";

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      include: {
        orders: true,
      },
    });
    if (!user) {
      const onlyName = session.user.name.split(" ")[0];
      const onlyLastName = session.user.name.split(" ")[1];
      try {
        const newUser = await prisma.user.create({
          data: {
            email: session.user.email,
            name: onlyName,
            password: process.env.DEFAULT_PASSWORD,
            lastName: onlyLastName ? onlyLastName : "",
            phone: session.user.phone ? session.user.phone : "",
            address: session.user.address ? session.user.address : "",
            city: session.user.city ? session.user.city : "",
            postalCode: session.user.postalCode ? session.user.postalCode : "",
            provider: "GOOGLE",
          },
        });
      } catch (error) {
        res.status(500).json({ message: "Error creating user" });
      }
    }
    res.status(200).json({ message: "Login successful", user: user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}
