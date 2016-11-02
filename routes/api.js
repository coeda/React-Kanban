const express = require('express');
const router = express.Router();
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.js');
const session = require('express-session');
const db = require('../models');
const Card = db.Card;

router.route('/')
  .get((req,res) => {
    Card.findAll({
      order: [['priority', 'DESC']]
    })
    .then((data) => {
      res.json({data});
    });
  })
  .post((req,res) => {
  Card.create({
    title: req.body.title,
    priority: parseInt(req.body.priority),
    status: req.body.status,
    createdBy: req.body.createdBy,
    assignedTo: req.body.assignedTo
  })
  .then((data) => {
    Card.findAll({
      order: [['priority', 'DESC']]
    })
    .then((data) => {
      res.json({data});
    });
  });
});

router.route('/:id')
  .put((req,res) => {
    let id = parseInt(req.params.id);
    Card.findById(id)
    .then((card) => {
        card.update({
          title: req.body.title || card.title,
          priority: parseInt(req.body.priority) || card.priority,
          status: req.body.status || card.status,
          createdBy: req.body.createdBy || card.createdBy,
          assignedTo: req.body.assignedTo || card.assignedTo
        })
        .then((data) => {
          Card.findAll({
            order: [['priority', 'DESC']]
          })
          .then((data) => {
            res.json({data});
          });
        });
    });
  })
  .delete((req,res) => {
  let id = parseInt(req.params.id);
  Card.findById(id)
  .then((photo) => {
      photo.destroy();
  });
});

module.exports = router;