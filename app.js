var express        = require('express')
  , _              = require('lodash')
  , bodyParser     = require('body-parser')
  , errorHandler   = require('errorhandler')
  , methodOverride = require('method-override')
  , morgan         = require('morgan')
  , http           = require('http')
  , path           = require('path')
  , db             = require('./models')
  , fs             = require('fs')
  , util           = require('util')
  , models         = require('./models')
  , Records        = require('./routes/Records.js')

var app = express()

// all environments
app.set('port', process.env.PORT || 3000)
app.set('views', __dirname + '/views')
app.set('view engine', 'jade')



var walk = function(dir, done) {
  // console.log('gonna walk dir: ', dir);
  var results = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var pending = list.length;
    if (!pending) return done(null, results);
    list.forEach(function(file) {
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          walk(file, function(err, res) {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          results.push(file);
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

function getDirection(file) {
  if (file) {
    var match = /_(IN|OUT)_/.exec(file);
    console.log('match: ', match);
    if( match && match[1]) {
      return match[1];
    }
    return '';
  } else {
    console.log('no file!!!: ', file);
  }
}

// middleware: pull in new records
app.use(function(req, res, next) {
  // console.log('gonna walk');
  var location = '/Users/kevinfriedheim/call-records';

    db.Records.findAll().success(function(entities) {
      return entities;
    })
    .then(function(records) {
      // console.log('found records: ', records);
      walk(location, function analyze(err, list) {
        if(err) { console.error('omg omg error: ', err); }
        list.forEach(function (file) {
            // console.log('found file: ', file);
            var stat = fs.statSync(file);
            var statUtil = util.inspect(stat);

            var date = /.*(\d{4}\-\d{2}\-\d{2})/.exec(file);
            console.log('date: ', date);

            // TODO: test that file name contains .wav (sound format)

            if (/\.wav$/i.test(file) && !_.findWhere(records, {'filename':file})) {
              db.Records.create({
                filename: file,
                direction: getDirection(file),
                filesize: stat.size,
                filecreationdate: (date && date[1]) ? date[1] : stat.birthtime
              });
            }
            // console.log('statUtil: ', statUtil);

        })
      });
    })
    .then(next)
});


app.use(morgan('dev'))
app.use(bodyParser())
app.use(methodOverride())
app.use(express.static(path.join(__dirname, 'public')))

// development only
if ('development' === app.get('env')) {
  app.use(errorHandler())
}



app.get('/supercall/Records', Records.findAll)
app.get('/supercall/Records/:id', Records.find)
app.get('/supercall/Records/open/:id', Records.open)
app.post('/supercall/Records', Records.create)
app.put('/supercall/Records/:id', Records.update)
app.del('/supercall/Records/:id', Records.destroy)


db
  .sequelize
  .sync()
  .complete(function(err) {
    if (err) {
      throw err
    } else {
      http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'))
      })
    }
  })
