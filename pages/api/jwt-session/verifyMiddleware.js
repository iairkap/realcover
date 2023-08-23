import { getSession } from "next-auth/react";

const verifyMiddleware = (handler) => async (req, res) => {
  console.log("Checking Session...");
  const session = await getSession({ req });

  if (session && session.user.email) {
    console.log("Session found:", session);

    if (session.provider === "google") {
      console.log("Google session detected.");
      // Aquí puedes manejar cualquier lógica específica para sesiones de Google
    }

    return handler(req, res, session.user.email); // Pasas el email al handler
  } else {
    console.warn("No session found");
    return res.status(401).json({ message: "Unauthorized, please SignIn" });
  }
};

export default verifyMiddleware;

/* import { getSession } from "next-auth/react";
import { verify } from "jsonwebtoken";

const verifyMiddleware = (handler) => async (req, res) => {
  const { token } = req.cookies;
  console.log("Checking Session...");
  const session = await getSession({ req });

  let verifyMethod;
  if (session && session.user.email) {
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

export default verifyMiddleware; */

/* 
import { getSession } from "next-auth/react";
import { verify } from "jsonwebtoken";

const verifyMiddleware = (handler) => async (req, res) => {
  //const { token } = req.cookies;
  const sessionToken = req.cookies["next-auth.session-token"];

  console.log("Initiating middleware verification...");
  console.log("Available token from cookies:", sessionToken);

  let verifyMethod;

  try {
    console.log("Attempting to fetch session...");
    const session = await getSession({ req });

    if (session && session.user && session.user.email) {
      console.log("Session successfully retrieved:", session);
      verifyMethod = session.user.email;
      console.log("Using email from session for verification:", verifyMethod);
    } else {
      console.log("No valid session found. Trying token verification...");

      if (sessionToken) {
        console.log("Token found. Attempting to verify...");
        const { email } = verify(sessionToken, process.env.JWT_SECRET);
        verifyMethod = email;

        console.log("Token successfully verified for email:", verifyMethod);
      } else {
        console.log("No valid token found in cookies.");
        throw new Error("No valid session or token available.");
      }
    }

    // Passing the verified email to the handler
    console.log(
      "Passing control to the handler with verification email:",
      verifyMethod
    );
    return handler(req, res, verifyMethod);
  } catch (error) {
    console.error("Error in middleware verification:", error.message);
    return res.status(401).json({ message: "Unauthorized, please SignIn" });
  }
};

export default verifyMiddleware;
 */
