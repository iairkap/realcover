import prisma from "../../../prisma/client";
import jwt from "jsonwebtoken";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  const { id } = req.query;
  const { token } = req.cookies;
  const { method } = req;
  const session = await getSession({ req });
  let verifyMethod;

  if (session) {
    verifyMethod = session.user.email;
  } else if (token) {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      verifyMethod = email;
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }

  switch (method) {
    case "GET":
      const user = await prisma.user.findUnique({
        where: {
          email: verifyMethod,
        },
        include: {
          orders: {
            include: {
              orderDetails: {
                include: {
                  products: true,
                },
              },
            },
          },
        },
      });
      if (!user) {
        return res.status(400).json({ message: "Login failed" });
      }
      return res.status(200).json({ message: "Login successful", user: user });

    case "PUT":
      const {
        name,
        lastName,
        phone,
        address,
        city,
        postalCode,
        password,
      } = req.body;
      const updatedUser = await prisma.user.update({
        where: {
          email: verifyMethod,
        },
        data: {
          name: name,
          lastName: lastName,
          phone: phone,
          address: address,
          city: city,
          postalCode: postalCode,
          password: password,
        },
      });

    case "DELETE":
      const deletedUser = await prisma.user.delete({
        where: {
          email: verifyMethod,
        },
      });
      return res.status(200).json({ message: "User deleted" });

    default:
      return res.status(405).json({ message: "Method not allowed" });
      break;
  }
}
