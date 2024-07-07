// * NodeMailer module - used for easy sending email from ur computer
// * can be dl and installed using npm (nodemailer)

import nodemailer from "nodemailer";

// * sending an email from ur server
// * use uname and pw from ur email to send.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "20210548m.mendador.jiro.bscs@gmail.com",
    pass: "rdga hhyh vdto tohh", // * this is only an app pw
  },
});

const mailOptionsSingle = {
  from: "20210548m.mendador.jiro.bscs@gmail.com",
  to: "jiromendador@gmail.com",
  subject: "NODEMAILER FROM NODE JS",
  text: "Hi! This is a sample email using nodemailer from node.js",
};

transporter.sendMail(mailOptionsSingle, function (err, info) {
  if (err) throw err;
  console.log("EMAIL SENT! : ", info.response);
});

// * for multiple receivers add the recipients in to property separated by commas
// * to send email with html use html property instead of text
const mailOptionsMultiple = {
  from: "20210548m.mendador.jiro.bscs@gmail.com",
  to: "jiromendador@gmail.com, orijrodadnem@gmail.com",
  subject: "NODEMAILER FROM NODE JS",
  html: `<h1>Hi!<h1>
        <h2>This is a sample email using 
          <span style='color:red;'>nodemailer<span> 
          from
          <span style='color:green;'>node.js<span> 
        <h2>`,
};

transporter.sendMail(mailOptionsMultiple, function (err, info) {
  if (err) throw err;
  console.log("EMAIL SENT! : ", info.response);
});