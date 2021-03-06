// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();
const PORT = 4000;

server.get('/', (req, res) => {
  res.send('<h1>hello world</h1>');
});

server.get('/api/users', (req, res) => {
  db.find()
    .then(users => {
      console.log('users?', users);
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ message: 'failed to get users' });
    });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(user => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: 'user does not exist' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'failed to get user' });
    });
});

server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
