const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const configureRoutes = require('./config/routes');

const server = express();
const corsOptions = {
  // If you're moving onto the stretch problem you'll need to set this obj with the appropriate fields
  // ensure that your client's URL/Port can achieve a Handshake
  // then pass this object to the cors() function
  origin: 'http://localhost:3000',
};

server.use(express.json());
server.use(cors(corsOptions));
server.use(helmet());

function logger(req, res, next){
  console.log(`${req.method} to ${req.url}`);
  next();
}

server.use(logger);

configureRoutes(server);

module.exports = {
  server,
};
