exports.Peer = require('./lib/peer');

exports.File = require('./lib/file');

exports.Tracker = require('./lib/tracker');

exports.createTracker = function(options) {
  return new exports.Tracker(options);
};

if (require.main === module) {  
  var tracker = exports.createTracker();
  tracker.listen();
}