import { transporter } from "../dao/managers/mailManager.js";

export const sendMail = async (req, res) => {
  try {
    const message = {
      from: "emisor@sender.com",
      to: "recepto@sender.com",
      subject: "Message title",
      text: "Hi",
      html: "<p>HTML version of the message</p>",
    };

    transporter.sendMail(message);
    res.send("Email enviado correctamente");
  } catch (error) {
    throw error;
  }
};
