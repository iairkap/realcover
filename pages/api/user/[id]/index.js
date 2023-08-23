import prisma from "../../../../prisma/client";
import verifyMiddleware from "../../jwt-session/verifyMiddleware";

const handler = async (req, res, verifyMethod) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: verifyMethod,
          },
        });

        if (!user) {
          return res.status(400).json({ message: "User not found" });
        }
        return res.status(200).json(user);
      } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Unexpected error occurred" });
      }

    case "PUT":
      console.log("Updating user with email:", verifyMethod);
      try {
        const {
          name,
          lastName,
          phone,
          address,
          city,
          postalCode,
          password,
          cuit,
          localidad,
          shopName,
        } = req.body;

        const updatedUser = await prisma.user.update({
          where: {
            email: verifyMethod,
          },
          data: {
            name,
            lastName,
            phone,
            address,
            city,
            postalCode,
            password,
            cuit,
            localidad,
            shopName,
          },
        });

        return res.status(200).json({
          message: "User updated successfully",
          user: updatedUser,
        });
      } catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ message: "Unexpected error occurred" });
      }

    case "DELETE":
      try {
        const userId = req.query.id;

        if (!userId) {
          return res
            .status(400)
            .json({ message: "No user ID provided in query" });
        }

        const deletedUser = await prisma.user.delete({
          where: {
            id: parseInt(userId),
          },
        });

        return res.status(200).json({
          message: `User with ID ${userId} deleted`,
          user: deletedUser,
        });
      } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({
          message: `Error deleting user with ID ${req.query.id}`,
        });
      }

    default:
      return res.status(405).json({ message: "Method not allowed" });
  }
};

export default verifyMiddleware(handler);
