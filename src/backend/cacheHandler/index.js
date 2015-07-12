var cacheLib = require('node-cache');
var cache = new cacheLib();

var CacheHandler = {};

CacheHandler.getCache = function (key) {
	return cache.get(key);
};

CacheHandler.setCache = function (key, val, ttl) {
	cache.set(key, val, ttl);
};

module.exports = CacheHandler;