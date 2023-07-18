import prisma from "../../../prisma/client";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  const { id } = req.query;
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { id: userId } = jwt.verify(token, process.env.JWT_SECRET);
  if (Number(id) !== userId) {
    return res.status(403).json({ message: "Forbidden" });
  }
  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error getting user" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, lastName, email, password } = req.body;
      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, lastName, email, password },
      });
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user" });
    }
  }
}
