var events = require('events')
  , util = require('util')
  , http = require('http')
  , url = require('url')
  , dgram = require('dgram')
  , redis = require('redis-node')
  , bencode = require('bncode')
  , _ = require('underscore');

var Tracker = module.exports = function(options) {
  this.options = _.defaults(options || {}, {
      routes: {
          announce: '/announce'
        , scrape: '/scrape'
      }
    , redis: {
          host: '127.0.0.1'
        , port: 6379
      }
    , http: {
          port: 8080
      }
    , udp: {
          port: 8081
      }
  });
  
  // Redis
  this.db = redis.createClient(this.options.redis.port, this.options.redis.host);
  
  // HTTP
  this.http = http.createServer();
  this.http.on('request', this.httpRequest.bind(this));
  this.http.on('error', this.httpError.bind(this));
  
  // UDP
  //this.udp = dgram.createSocket('udp4');
};
util.inherits(Tracker, events.EventEmitter);

Tracker.prototype.announce = function(object, fn) {
  
  fn({ 'failure reason': 'Tracker not fully implemented yet :(' });
  
};

Tracker.prototype.httpRequest = function(req, res) {
  var u = url.parse(req.url, true);
  
  //console.log(u);
  
  switch (u.pathname) {
    case this.options.routes.announce:
      this.announce(u.query, function(result) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(bencode.encode(result));
      });
      break;
    default:
      res.writeHead(404);
      res.end();
  }
};

Tracker.prototype.httpError = function(req, res) {
  console.log(req);
};

Tracker.prototype.listen = function(options, fn) {
  if (_.isFunction(options)) {
    fn = options;
    options = {};
  }
  
  var options = _.defaults(options || {}, this.options)
    , done = function() { if (!--i && fn) fn(); }
    , i = 1;
    
  this.http.listen(options.http.port, options.http.host, done);
  //this.udp.bind(options.udp.port);
};