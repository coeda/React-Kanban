const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const CONFIG = require('./config/config.json');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const passport = require('passport');
const bcrypt = require('bcrypt');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const db = require('./models');
const Card = db.Card;
const User = db.User;
// Check to see what dev environment we are in
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;

app.use(express.static('./public'));
// app.set('view engine', 'pug');
// app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true}));
// app.use(session({
//   store: new RedisStore(),
//   secret: CONFIG.SECRET,
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

  app.get('/apiQueue', (req,res) => {
    Card.findAll({
      where: {
        status: 'queue'
      },
      order: [['priority', 'DESC']]
    })
    .then((data) => {
      res.json({data});
    });
  });

  app.get('/apiInProgress', (req,res) => {
    Card.findAll({
      where: {
        status: 'in progress'
      },
      order: [['priority', 'DESC']]
    })
    .then((data) => {
      res.json({data});
    });
  });

  app.get('/apiCompleted', (req,res) => {
    Card.findAll({
      where: {
        status: 'completed'
      },
      order: [['priority', 'DESC']]
    })
    .then((data) => {
      res.json({data});
    });
  });

  app.post('/', (req,res) => {
    Card.create({
      title: req.body.title,
      priority: parseInt(req.body.priority),
      status: req.body.status,
      createdBy: req.body.createdBy,
      assignedTo: req.body.assignedTo
    });
  });

  app.put('/api/:id', (req,res) => {
    let id = parseInt(req.params.id);
    Card.findById(id)
    .then((photo) => {
        photo.update({
          title: req.body.title,
          priority: parseInt(req.body.priority),
          status: req.body.status,
          createdBy: req.body.createdBy,
          assignedTo: req.body.assignedTo
        });
    });
  });

  app.delete('/', (req,res) => {
    let id = parseInt(req.params.id);
    Card.findById(id)
    .then((photo) => {
        photo.destroy();
    });
  });

if (isDeveloping) {
  app.set('host', 'http://localhost');
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false,
    },
  });
  const response = (req, res) => {
    res.write(middleware.fileSystem.readFileSync(path.resolve(__dirname, 'dist/index.html')));
    res.end();
  };

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', response);

} else {
  app.use(express.static(`${__dirname}/dist`));
  app.get('*', (req, res) => {
    res.write(
      fs.readFileSync(path.resolve(__dirname, 'dist/index.html'))
    );
  });
}



const onStart = (err) => {
  if (err) {
    throw new Error(err);
  }
  console.info(
    `==> 🌎 Listening on port ${port}. ` +
    `Open up http://localhost:${port}/ in your browser.`
  );
};

app.listen(port, 'localhost', onStart);

