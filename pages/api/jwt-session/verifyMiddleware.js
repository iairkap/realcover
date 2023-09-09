import jwt from "jsonwebtoken";
import { decode } from "next-auth/jwt";

const verifyMiddleware = (handler) => async (req, res) => {
  const googleToken = req.cookies["next-auth.session-token"];
  const emailToken = req.cookies["token"];
  const JWT_SECRET = process.env.JWT_SECRET;
  const NEXT_SECRET = process.env.NEXTAUTH_SECRET;
  let verifyMethod;

  try {
    if (googleToken) {
      const decodedToken = await decode({
        token: googleToken,
        secret: NEXT_SECRET,
      });
      const { email } = decodedToken;
      verifyMethod = email;
    } else if (emailToken) {
      const decodedToken = jwt.verify(emailToken, JWT_SECRET);
      const { email } = decodedToken;
      verifyMethod = email;
    } else {
      throw new Error("No valid session or token available.");
    }
    req.verifiedEmail = verifyMethod; // Añadir el email verificado al objeto req

    return handler(req, res, verifyMethod);
  } catch (error) {
    console.error("Error in middleware verification:", error.message);
    return res.status(401).json({ message: "Unauthorized, please SignIn" });
  }
};

export default verifyMiddleware;
