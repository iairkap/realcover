import prisma from "../../../prisma/client";
import verifyMiddleware from "../jwt-session/verifyMiddleware";

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
  }
}

export default verifyMiddleware(handler);
