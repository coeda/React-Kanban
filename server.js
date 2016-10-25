const express = require('express');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config.json');
const app = express();
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const db = require('./models');
const Card = db.Card;
const User = db.User;

app.use(express.static('./public'));
app.set('view engine', 'pug');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true}));
app.use(session({
  store: new RedisStore(),
  secret: CONFIG.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.listen(3000, function() {
  db.sequelize.sync();
});

let isLoggedIn = (req) => {
  if(req.user !== undefined && req.user !== false) {
    return true;
  }
  return false;
};

app.get('/', function(req, res) {
  Photo.findAll({
    order: [['id', 'DESC']]
  })
  .then((photos) => {
    res.render('gallery', {
      featured: photos.shift(),
      gallery: photos,
      isLoggedIn: isLoggedIn(req),
      username: username
    });
  });
});

app.get('/api', (req, res) => {
  Card.findAll({
    order: [['id', 'DESC']]
  })
  .then((data) => {
    res.json({data});
  });
});

app.get('/:page', (req, res) => {
  res.status(404).render('404');
});

module.exports = app;