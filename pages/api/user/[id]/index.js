import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

async function handler(req, res, verifyMethod) {
  const { method } = req;

  switch (method) {
    case "GET":
      const user = await prisma.user.findUnique({
        where: {
          email: verifyMethod,
        },
        include: {
          orders: {
            include: {
              discount: true,
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
      const { name, lastName, phone, address, city, postalCode, password } =
        req.body;

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

      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });

    case "DELETE":
      const userId = req.query.id;
      if (userId) {
        try {
          const deletedUser = await prisma.user.delete({
            where: {
              id: parseInt(userId),
            },
          });
          return res
            .status(200)
            .json({ message: `User with ID ${userId} deleted` });
        } catch (error) {
          console.error("Error deleting user:", error);
          return res
            .status(500)
            .json({ message: `Error deleting user with ID ${userId}` });
        }
      } else {
        return res
          .status(400)
          .json({ message: "No user ID provided in query" });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
}

export default handler;
