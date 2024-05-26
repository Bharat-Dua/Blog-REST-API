const nodeEmail = require("nodemailer");

const sendEmail = async ({ emailTo, subject, code, content }) => {
  const transporter = nodeEmail.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "bharatdua13@gmail.com",
      pass: "wrxt sqom zcxv twuh",
    },
  });

  const message = {
    to: emailTo,
    subject,
    html: `
     <div>
        <h3>Use this below code to ${content}</h3>
        <p><strong>Code:</strong>${code}</p>
     </div>
    `,
  };
  await transporter.sendMail(message);
};
module.exports = sendEmail;
