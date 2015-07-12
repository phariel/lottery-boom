var exiler = require('exiler');
var dataHandler = require('./backend/dataHandler');
var logger = require('./backend/logger');
var args = process.argv;
var port;
var isDebug;

if (args.indexOf('--debug') > 1) {
	logger.open();
	isDebug = true;
} else {
	port = 12306;
}

var options = {
	publicUrl: 'asset',
	publicFolder: 'frontend/asset',
	templateFolder: 'frontend/template',
	route: {
		index: {
			ex_template: 'index.ejs',
			ex_data: function (resolve) {
				var mainPath = '';
				var requirePath = '';
				if (isDebug) {
					requirePath = '/asset/js/bower_components/requirejs/';
					mainPath = '/asset/js/';
				} else {
					requirePath = '/asset/js/';
					mainPath = '/asset/js/';
				}
				resolve({
					requirePath: requirePath,
					mainPath: mainPath
				});
			}
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
exiler.server(options, port);