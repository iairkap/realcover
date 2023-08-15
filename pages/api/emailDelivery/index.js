import nodemailer from "nodemailer";
import htmlToText from "nodemailer-html-to-text";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // Extraer información del cuerpo de la solicitud
    const { shippingDetails, email, user } = req.body;
    const { encomiendaName, trackingNumber } = shippingDetails;

    // Configurar transporte para nodemailer
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Opciones de correo
    let mailOptions = {
      from: process.env.GMAIL_ACCOUNT,
      to: `${email}, iairkap@gmail.com`,
      subject: "Confirmación de Envío de Compra",
      html: `
        <div>
          <p>Estimado(a) ${user.name} ${user.lastName},</p>
          <p>Es un placer informarte que tu pedido ha sido enviado con éxito. A continuación, los detalles de tu envío:</p>
          <ul>
            <li><strong>Nombre de encomienda:</strong> ${encomiendaName}</li>
            <li><strong>Número de seguimiento:</strong> ${trackingNumber}</li>
            <li><strong>Comprobante de envío:</strong> [Aquí puedes incluir el link de descarga del comprobante en Firebase]</li>
          </ul>
          <p>Te agradecemos por confiar en nosotros. Si tienes alguna consulta, no dudes en comunicarte.</p>
          <p>Saludos cordiales,</p>
          <p>El equipo de Real Cover</p>
        </div>
      `,
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar el correo:", error);
        res
          .status(500)
          .json({ error: "Error al enviar el correo electrónico" });
      } else {
        res.status(200).json({ success: true });
      }
    });
  } else {
    // Manejar otros métodos HTTP que no sean POST
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
