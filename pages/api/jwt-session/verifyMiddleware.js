import { getSession } from "next-auth/react";
import { verify } from "jsonwebtoken";

const verifyMiddleware = (handler) => async (req, res) => {
  const { token } = req.cookies;
  console.log("Checking Session...");
  const session = await getSession({ req });

  let verifyMethod;
  if (session) {
    console.log("Session found:", session);
    verifyMethod = session.user.email;
  } else if (token) {
    console.log("Token found:", token);
    try {
      const { email } = verify(token, process.env.JWT_SECRET);
      verifyMethod = email;
      console.log("Token verified for:", email);
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  } else {
    console.warn("No session or token found");
    return res.status(401).json({ message: "Unauthorized, please SignIn" });
  }
  return handler(req, res, verifyMethod);
};

export default verifyMiddleware;
