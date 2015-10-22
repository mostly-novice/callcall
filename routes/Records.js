var db = require('../models')

exports.findAll = function(req, res) {
  db.Records.findAll().success(function(entities) {
    res.json(entities)
  })
}

exports.find = function(req, res) {
  db.Records.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      res.json(entity)
    } else {
      res.send(404)
    }
  })
}

exports.create = function(req, res) {
  db.Records.create(req.body).success(function(entity) {
    res.statusCode = 201
    res.json(entity)
  })
}

exports.update = function(req, res) {
  db.Records.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.updateAttributes(req.body).success(function(entity) {
        res.json(entity)
      })
    } else {
      res.send(404)
    }
  })
}

exports.open = function(req, res) {
  db.Records.find({ where: { id: req.param('id') } }).success(function(entity) {
    if( entity) {

      function getCommandLine() {
         switch (process.platform) { 
            case 'darwin' : return 'open';
            case 'win32' : return 'start';
            case 'win64' : return 'start';
            default : return 'xdg-open';
         }
      }

      var sys = require('sys');
      var exec = require('child_process').exec;

      if ( exec(getCommandLine() + ' ' + entity.filename) ) {
        res.send(1);
      } else {
        res.send(0);
      }
      // do open

      // if success - return 1


      // else return 0
    } else {
      res.send(404);
    }
  })
}

exports.destroy = function(req, res) {
  db.Records.find({ where: { id: req.param('id') } }).success(function(entity) {
    if (entity) {
      entity.destroy().success(function() {
        res.send(204)
      })
    } else {
      res.send(404)
    }
  })
}
