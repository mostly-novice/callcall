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

exports.openFile = function(req, res) {
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

      var util = require('util');
      var exec = require('child_process').exec;
      var cmd = getCommandLine() + ' "' + entity.filename + '"';

      console.log('Running command: ', cmd);

      exec(cmd, function(error, stdout, stderr) {
        console.log('error: ', error);
        console.log('stdout: ', stdout);
        console.log('stderr: ', stderr);
      });

      if ( exec(cmd) ) {
        res.send(1);
      } else {
        res.send(0);
      }
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
