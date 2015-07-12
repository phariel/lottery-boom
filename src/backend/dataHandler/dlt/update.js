var http = require('http');
var dbHelper = require('../dbHelper');

var DLTUpdate = {};
var source = 'http://f.apiplus.cn/dlt-20.json';

function transformData(origin) {
	var section = sectionSplit(origin.opencode);
	return {
		table: 'dlt',
		fields: {
			json: '"' + encodeURIComponent(JSON.stringify(section)) + '"',
			serial: origin.expect,
			open_date: '"' + Date.parse(origin.opentime) + '"',
			update_date: '"' + Date.now() + '"'
		}
	};
}

function sectionSplit(data) {
	var arr = data.split('+');
	return {
		section1: arr[0],
		section2: arr[1]
	};
}

function parse(data, callback) {
	data = JSON.parse(data).data;
	data.sort(function (a, b) {
		return b.expect - a.expect;
	});

	dbHelper.retrieve({
		table: 'dlt',
		fields: ['serial'],
		orderBy: 'serial desc',
		limit: 1
	}, function (err, row) {
		var serial = row[0].serial;
		var insertArr = [];

		data.every(function (v, i) {
			if (!serial || serial < parseInt(v.expect, 10)) {
				insertArr.push(transformData(v));
			} else {
				return false;
			}
			return true;
		});

		dbHelper.insert(insertArr);

		callback();
	});
}

DLTUpdate.start = function (callback) {
	http.get(source, function (res) {
		var response = "";
		res.setEncoding('utf8');
		res.on('data', function (data) {
			response += data;
		});
		res.on('end', function () {
			parse(response, callback);
		});
	});
};

module.exports = DLTUpdate;