import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, email, mensaje } = req.body;

    const content = {
      to: "realcover@gmail.com",
      from: "realcover@gmail.com",
      subject: `Nuevo mensaje de ${nombre}`,
      text: mensaje,
      mail_settings: {
        sandbox_mode: {
          enable: true,
        },
      },
    };

    try {
      await sgMail.send(content);
      res.status(200).json({ status: "Ok" });
    } catch (error) {
      console.log("ERROR", error);
      res.status(500).json({ error: error.toString() });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Método ${req.method} no permitido.`);
  }
}
