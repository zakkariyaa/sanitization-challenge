const express = require('express');
const { home } = require('./templates.js');

const server = express();

const posts = [];

server.get('/', (req, res) => {
  const body = home(posts);
  res.send(body);
});

server.post('/', express.urlencoded({ extended: false }), (req, res) => {
  const nickname = req.body.nickname;
  const message = req.body.message;
  const created = Date.now();

  if (!nickname || !message) {
    const body = home(posts, { nickname, message });
    res.status(400).send(body);
  } else {
    posts.push({ nickname, message, created });
    res.redirect('/');
  }
});

module.exports = server;
