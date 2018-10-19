const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticate } = require('./middlewares');

const jwtKey = require('../_secrets/keys').jwtKey;

const db = require('../database/dbConfig.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
  server.get('/', test);
};

function test(req, res){
  res.send(`We're in business!`);
}

// generate a JSON web token based on the user's information
function generateToken(user) {
  const jwtPayload = {
    ...user,
  };
  const jwtOptions = {
    expiresIn: '1h',
  }
  return jwt.sign(jwtPayload, jwtKey, jwtOptions);
}

async function register(req, res) {
  // implement user registration
  try{
    // hash the password input
    const creds = req.body;
    if(!creds || !creds.password || !creds.username){
      res.status(400).json({error: "User must have a name and a password."})
    }
    const hash = bcrypt.hashSync(creds.password, 14);
    creds.password = hash;
    // await the return of the new user ID
    const newUserId = await db('users').insert(creds);
    try {
      // find the newuser details based on the ID
      const newUser = await db('users').where({id: newUserId[0]}).first();
      // plug the user details into the token generator
      const token = generateToken(newUser);
      // return the token object to the client via res.token
      return res.status(201).json({token});
    } catch(err) {
      console.error(err);
      return res.status(404).json(err);
    }
  } catch(err){
    console.error(err);
    return res.status(500).json(err);
  }
}

async function login(req, res) {
  // implement user login
  try {
    const creds = req.body;
    const user = await db('users').where({username: creds.username}).first();
    if(user && bcrypt.compareSync(creds.password, user.password)){
      const token = generateToken(user);
      res.status(200).json({welcome: user.username, token});
    } else {
      res.status(401).json({message: 'Invalid User Credentials'})
    }
  } catch(err){
    console.log(err);
    return res.status(500).json(err);
  }
}

function getJokes(req, res) {
  axios
    .get(
      'https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_ten'
    )
    .then(response => {
      res.status(200).json(response.data);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
