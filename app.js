var exiler = require('exiler');

var options = {
	publicUrl: 'asset',
	publicFolder: 'src/asset_files',
	templateFolder: 'src/ejs_files',
	route: {
		index: {
			ex_template: 'index.ejs',
			ex_data: {}
		}
	}
};

exiler.server(options);