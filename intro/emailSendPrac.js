import nodemailer from "nodemailer";
import http from "http";

// * to process form data use Query String module
import qs from "querystring";

// * with styles
// * it seems like u always need a form to make an action in browser for node
// ! NOTE : use enctype : application/x-www-form-urlencoded when your form doesn't include files
// ! NOTE : if ur form is not getting any data it can be due to wrong enctype!!!
let html = `
    <style>
      .in-col {
        padding:2em; 
        max-width:500px; 
        display:flex; 
        flex-flow:column wrap; 
        gap:1em; 
        border:2px solid black;
      }
    </style>
    <form class="in-col" action="sendEmail" method="POST" enctype="application/x-www-form-urlencoded">
      <input type="email" placeholder="Enter recipient's here..." name="recipientEmail">
      <input type="text" placeholder="Enter email subject here..." name="emailSubject">
      <input type="text" placeholder="Enter message here..." name="emailMessage">
      <input type="submit"
            style="background-color:black; color:white; height:50px; border-radius:15px;"  
            name="sendEmail" value="SEND EMAIL">
    </form>  
`;

// * sending an email from ur server
// * use uname and pw from ur email to send.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "20210548m.mendador.jiro.bscs@gmail.com",
    pass: "rdga hhyh vdto tohh", // * this is only an app pw
  },
});

const mailOptions = {
  from: "20210548m.mendador.jiro.bscs@gmail.com",
  to: "",
  subject: "",
  text: "",
};

http
  .createServer(function (req, res) {
    if (req.url === "/sendEmail" && req.method === "POST") {
      var data = "";
      // * getting data
      req.on("data", function (chunkOfData) {
        data += chunkOfData;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (data.length > 1e6) {
          // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
          req.socket.destroy();
        }
      });

      // * after reading and getting the chunkOfData
      req.on("end", function () {
        // * parsing form-data to access it
        const POST = qs.parse(data);

        // * form fields
        // formData.[enter the name on the input] || using the OR is there's no input
        const recipient = POST.recipientEmail || "NO EMAIL";
        const subject = POST.emailSubject || "NO SUBJECT";
        const message = POST.emailMessage || "NO MESSAGE";

        console.log("FORM DATA:");
        console.log(recipient, subject, message);

        mailOptions.to = recipient;
        mailOptions.subject = subject;
        mailOptions.text = message;

        // * send email here
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) throw err;
          console.log("EMAIL SENT! : ", info.response);
          // * response to user
          res.write("EMAIL SENT!");
          res.end();
        });
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(html);
      return res.end();
    }
  })
  .listen(8080);