define(function (require) {
	var poly = require('poly/array');
	var PROP_WEAVE = 'weave';
	var UNDEF = undefined;

	function Load(config) {
		var self = this;

		self.config = config;
		if (window.location.hash) {
			self.handleHash();
		}

		window.onhashchange = function () {
			self.handleHash();
		};
	}

	Load.prototype.handleHash = function () {
		var self = this;
		var hashArr = window.location.hash.replace('#', '').split('/');
		if (self.config) {
			var route = self.config;
			hashArr.every(function (v, i) {
				route = route[v];
				return !route === UNDEF;
			});
			if (route) {
				self.woven = route[PROP_WEAVE];
			}
		}
	};

	return Load;
});