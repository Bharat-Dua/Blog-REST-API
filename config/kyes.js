const { PORT, CONNECTION_URL, JWT_SECRETKEY,SENDER_EMAIL,EMAIL_PASSWORD } = process.env;
module.exports = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
  jwtSecretKey: JWT_SECRETKEY,
  senderEmail:SENDER_EMAIL,
  emailPassword:EMAIL_PASSWORD
};
