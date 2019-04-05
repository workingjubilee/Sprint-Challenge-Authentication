const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig.js');

const { authenticate } = require('../auth/authenticate');

function findByUsername(username) {
  return db('users').select('username').where(username);
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
  // Yes? Needs DB model actions.
// - [ ] Implement the `login` function inside `/config/routes.js`.
  // Yes? Needs DB model actions.
// - [ ] Use JSON Web Tokens for authentication.
  // JSON WEB TOKEN REQUIRES:
  // GENERATION FUNCTION - yes
  // VERIFICATION FUNCTION - maybe?


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
  let { username, password } = user;

  if (!username || !password) {
    res.status(400).json({ message: "You need both a username and password to log in." })
  } else {

    try {
      let matchUser = await findByUsername(username);

      if (bcrypt.compareSync(password, matchUser.password)) {
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
