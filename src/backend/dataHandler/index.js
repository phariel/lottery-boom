var DataHandler = {};
var dlt = require('./dlt');

var PROP_TYPE = 'type',
	PROP_NUM = 'num';

DataHandler.parse = function (resolve, param) {
	switch (param[PROP_TYPE]) {
		case 'dlt':
			dlt.parse(resolve, param[PROP_NUM]);
			break;
		default:
			dlt.parse(resolve, param[PROP_NUM]);
	}
};

module.exports = DataHandler;