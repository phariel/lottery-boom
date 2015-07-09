var cacheHandler = require('../../cacheHandler');
var dbHelper = require('../dbHelper');
var dltUpdate = require('./update');

var DLT = {};

var PROP_CACHE = 'dlt';

DLT.parse = function (resolve, num) {
	var cacheDLT = cacheHandler.getCache(PROP_CACHE);
	!num && (num = 20);

	if (cacheDLT) {
		console.log('via cache');
		num > cacheDLT.length && (num = cacheDLT.length);

		resolve(cacheDLT.slice(0, num));
	} else {
		dltUpdate.start(function () {
			dbHelper.retrieve({
				fields: ['serial', 'json', 'open_date'],
				table: 'dlt',
				orderBy: 'serial desc',
				limit: 50
			}, function (err, row) {
				row.map(function (obj) {
					obj.json = JSON.parse(decodeURIComponent(obj.json));
					return obj;
				});
				cacheHandler.setCache(PROP_CACHE, row, 86400);
				num > row.length && (num = row.length);
				resolve(row.slice(0, num));
			});
		});
	}
};

module.exports = DLT;