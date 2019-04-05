const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

const { authenticate } = require('../auth/authenticate');

function findByUsername(username) {
  return db('users').where(username).first();
}

function add(user) {
  return db('users').insert(user);
}


function generateToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  }
  const secret = process.env.JWT_SECRET;
  const options = {
    expiresIn: '1d',
  }
}


// - [ ] Implement the `register` function inside `/config/routes.js`.
  // Yes.
// - [ ] Implement the `login` function inside `/config/routes.js`.
  // Yes.
// - [ ] Use JSON Web Tokens for authentication.
  // JSON WEB TOKEN REQUIRES:
  // GENERATION FUNCTION - yes
  // VERIFICATION FUNCTION - yes?


module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  let { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "You need both a username and password to register." })
  } else {

    try {
      let hash = bcrypt.hashSync(password, 13);
      password = hash;

      let newUser = await add({ username, password });

      res.status(200).json({ 
        message: "You've successfully registered!",
        newUser
      })
    } catch(error) {
      res.status(500).json({ message: "Register machine broke." })
    } // layer 2
  } // layer 1
};

async function login(req, res) {
  const user = req.body;
  let { username, password } = req.body;
  console.log(user, username, password)

  if (!username || !password) {
    res.status(400).json({ message: "You need both a username and password to log in." })
  } else {
    console.log("Layer 1.")

    try {
      console.log("Layer 2.")
      let matchUser = await findByUsername({ username });

      console.log(matchUser);

      if (bcrypt.compareSync(password, matchUser.password)) {
        console.log("Layer 3.")
        const token = generateToken(user);


        res.status(200).json({
          message: "Welcome!",
          token
        })
      } else {
        res.status(403).json({ message: "No." })
      } // layer 3
    } catch(error) {
      res.status(500).json({ message: "Login machine broke." })
    } // layer 2
  } // layer 1
};

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
