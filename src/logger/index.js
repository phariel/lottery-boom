var Logger = {};

var isOpened;

Logger.open = function () {
	isOpened = true;
};

Logger.log = function () {
	if (isOpened) {
		for (var v in arguments) {
			if (arguments.hasOwnProperty(v)) {
				console.log(arguments[v]);
			}
		}
	}
};

module.exports = Logger;