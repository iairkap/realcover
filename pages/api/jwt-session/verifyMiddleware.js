import { getSession } from "next-auth/react";
import jwt from "jsonwebtoken";

const verifyMiddleware = (handler) => async (req, res) => {
  const { token } = req.cookies;
  const session = await getSession({ req });
  let verifyMethod;

  if (session) {
    verifyMethod = session.user.email;
  } else if (token) {
    try {
      const { email } = jwt.verify(token, process.env.JWT_SECRET);
      verifyMethod = email;
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized, no token" });
    }
  } else {
    return res.status(401).json({ message: "Unauthorized, please SignIn" });
  }
  return handler(req, res, verifyMethod);
};

export default verifyMiddleware;
