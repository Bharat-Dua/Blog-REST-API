const { PORT, CONNECTION_URL, JWT_SECRETKEY } = process.env;
module.exports = {
  port: PORT,
  connectionUrl: CONNECTION_URL,
  jwtSecretKey: JWT_SECRETKEY,
};
