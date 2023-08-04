import nodemailer from "nodemailer";
import htmlToText from "nodemailer-html-to-text";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cartData, email } = req.body;

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    transporter.use("compile", htmlToText.htmlToText());

    // Here's the HTML for the cart items
    let cartItemsHTML = Object.values(cartData)
      .map(
        (item) => `
        <table style="width: 70%; border: 1px solid black; margin-bottom: 20px;">
          <tr>
            <td rowspan="4" style="width: 100px;">
              <img src="${
                item.picture
              }" alt="Product image" style="width: 100px; height: 100px;"/>
            </td>
            <td style="padding-left: 10px;">${item.imageName.replace(
              /%2F/g,
              " "
            )}</td>
            <td rowspan="4" style="text-align: right;">${item.price *
              item.quantity}$</td>
          </tr>
          <tr>
            <td style="padding-left: 10px;">Size: ${item.size}</td>
          </tr>
          <tr>
            <td style="padding-left: 10px;">Price: ${item.price}$</td>
          </tr>
          <tr>
            <td style="padding-left: 10px;">Quantity: ${item.quantity}</td>
          </tr>
        </table>
      `
      )
      .join("");
    let total = Object.values(cartData).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let mailOptions = {
      from: "YOUR_GMAIL_ACCOUNT",
      to: `${email}, iairkap@gmail.com`,
      subject: "Orden de Compra",
      html: `
        <div>
          <h1>CARRITO DE COMPRA</h1>
          <h2>Producto</h2>
          <h2>Subtotal</h2>
          ${cartItemsHTML}
          <p>Total: ${total}$</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res
          .status(500)
          .json({ error: "Error al enviar el correo electrónico" });
      } else {
        res.status(200).json({ success: true });
      }
    });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
