const http = require("http");
const app = require("./app");
// Get port from environment and store in Express
const { port } = require("./config/kyes");

// create server

const server = http.createServer(app);

// listen server

server.listen(port, () => console.log(`server is running at ${port}`));
