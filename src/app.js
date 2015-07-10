var exiler = require('exiler');
var dataHandler = require('./dataHandler');
var logger = require('./logger');
var args = process.argv;
var port;

if (args.indexOf('--debug') > 1) {
	logger.open();
} else {
	port = 12306;
}

var options = {
	publicUrl: 'asset',
	publicFolder: 'src/asset_files',
	templateFolder: 'src/ejs_files',
	route: {
		index: {
			ex_template: 'index.ejs'
		},
		data: {
			ex_param_type: {
				ex_data: dataHandler.parse,
				ex_param_num: {
					ex_data: dataHandler.parse
				}
			}
		}
	}
};

module.exports = function () {
	exiler.server(options, port);
};