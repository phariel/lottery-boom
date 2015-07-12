define(function (require) {
	var $ = require('jquery');
	var when = require('when');

	function DltData() {
		return when.promise(function (resolve) {
			$.get('/data/dlt?_=' + Date.now(), function (data) {
				resolve(data);
			});
		});
	}

	return DltData;
});