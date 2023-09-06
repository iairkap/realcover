import nodemailer from "nodemailer";
import renderToString from "../../../src/app/helpers/renderToString";
import Email from "../../../src/app/emailPrueba/emailPrueba";
export default async function handler(req, res) {
  console.log("Request received:", req.body); // Agregado
  if (req.method === "POST") {
    const emailContent = renderToString(Email, {
      cartData: req.body.cartData,
      email: req.body.email,
      orderId: req.body.orderId,
      total: req.body.total,
      couponCode: req.body.couponCode,
      name: req.body.name,
      // ... cualquier otro dato que necesites
    });

    // Configura Nodemailer con las credenciales de tu proveedor de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "iairkap@gmail.com",
      subject: "Asunto del correo",
      html: emailContent,
    };
    console.log("Mail options:", mailOptions); // Agregado

    try {
      const info = await transporter.sendMail(mailOptions);
      res.status(200).send("Correo enviado: " + info.response);
    } catch (error) {
      console.error("Hubo un error al enviar el correo: ", error);
      res.status(500).send("Error al enviar el correo.");
    }
  } else {
    res.status(405).send("Método no permitido");
  }
}
