var connect = require('../config/connect');

module.exports.findWhere=function(obj, cb){
	connect(function(err, client){
		var db = client.db('tss11');
		db.collection('user').find(obj).toArray(cb);
	});
}