describe('Tracker', function() {
  var http = require('http')
    , track = require('../')
    , tracker;
    
  beforeEach(function() {
    tracker = track.createTracker();
  });
  
  describe('#constructor()', function() {
    
    it('should fall back on default options', function() {
      tracker.options.should.exist;
    });
  
    it('should create a redis connection', function() {
      tracker.db.should.exist;
      tracker.db.host.should.exist;
      tracker.db.port.should.exist;
    });
    
    it('should extend events.EventEmitter', function() {
      tracker.emit.should.exist;
      tracker.on.should.exist;
    });
      
  });
  
  describe('#constructor(options)', function() {
    
    var tracker;
    beforeEach(function() {
      tracker = track.createTracker({
          redis: { host: 'redis.test', port: 7357 }
        , http: { host: 'http.test', port: 1337 }
      });
    });
    
    it('should use the options set', function() {
      tracker.options.redis.host.should.equal('redis.test');
      tracker.options.redis.port.should.equal(7357);
      tracker.options.http.host.should.equal('http.test');
      tracker.options.http.port.should.equal(1337);
    });
    
  });
  
  describe('#listen()', function() {
    
    it('should http listen with the defaults', function(done) {
      tracker.listen(function() {
        http.get(tracker.options.http, function(res) {
          res.connection.should.exist;
          done();
        });
      });
    });
    
  });
  
});