import nodemailer from "nodemailer";

// config ethereal
export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "dejon89@ethereal.email",
    pass: "wFg9MNSwPCWsCEfP49",
  },
});
