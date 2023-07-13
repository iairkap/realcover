import { PrismaClient } from "@prisma/client";
import { verifyIdToken } from "firebase-admin";
import withSession from "@/session";

const prisma = new PrismaClient();

export default withSession(async (req, res) => {
  if (req.method === "POST") {
    const { idToken } = req.body;
    const decodedToken = await verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          picture,
          provider: "google",
        },
      });
    }

    req.session.set("user", { id: user.id, email: user.email });
    await req.session.save();
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
});
