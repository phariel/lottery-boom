var path = require('path');
var sqlite = require('sqlite3').verbose();
var logger=require('../logger');

var DBHelper = {};

var PROP_FIELDS = 'fields',
	PROP_LIMIT = 'limit',
	PROP_ORDER_BY = 'orderBy',
	PROP_TABLE = 'table',
	PROP_WHERE = 'where';

function openDB() {
	return new sqlite.Database(path.join(__dirname, '../dataSource/guessme.sqlite'));
}

DBHelper.retrieve = function (obj, callback) {
	var db = openDB();
	var sql = 'SELECT ';

	if (obj[PROP_FIELDS]) {
		sql += obj[PROP_FIELDS].join(',');
	} else {
		sql += '*';
	}

	sql += ' FROM ' + obj[PROP_TABLE];

	if (obj[PROP_WHERE]) {
		sql += ' WHERE ' + obj[PROP_WHERE];
	}

	if (obj[PROP_ORDER_BY]) {
		sql += ' ORDER BY ' + obj[PROP_ORDER_BY];
	}

	if (obj[PROP_LIMIT]) {
		sql += ' LIMIT ' + obj[PROP_LIMIT];
	}

	logger.log('retrieve sql', sql);

	db.serialize(function () {
		db.all(sql, function (err, row) {
			callback(err, row);
		});
	});

	db.close();
};

function insertDB(obj, db) {
	var sql = 'INSERT INTO ' + obj[PROP_TABLE];
	var columns = ' (';
	var values = ' (';

	Object.keys(obj[PROP_FIELDS]).forEach(function (v, i) {
		columns += (i === 0 ? '' : ',') + v;
		values += (i === 0 ? '' : ',') + obj[PROP_FIELDS][v];
	});

	sql += columns + ') VALUES' + values + ')';

	logger.log('insert sql', sql);

	db.run(sql);
}

DBHelper.insert = function (obj) {
	if (obj.length === 0) return;

	var db = openDB();

	obj.forEach(function (v, i) {
		insertDB(v, db);
	});

	db.close();
};

module.exports = DBHelper;