const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 8080;

app.use(express.json({ extended: false }));

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: 1025,
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "application is healthy",
  });
});

app.post("/send", (req, res) => {
  const { to, sub, body } = req.body;

  const obj = transporter.sendMail({
    from: "My company <localhost@mailhog.local>",
    to: to,
    subject: sub,
    text: body,
  });

  if (!obj) {
    res.status(500).json({
      status: "internal server error",
      message: "error sending message",
    });
  }

  res.status(201).json({
    status: "create",
    message: "message sent",
  });
});

app.listen(port, () => {
  console.log(`Service endpoint http://localhost:${port}`);
});
