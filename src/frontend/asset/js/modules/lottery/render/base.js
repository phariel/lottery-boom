define(function (require) {
	var basicTemplate = require('jsx!./basic');

	function RenderBase(dataPromise) {
		this.dataPromise = dataPromise;
	}

	RenderBase.prototype.render = function (templateType) {
		var self = this;
		switch (templateType) {
			case 'basic':
				basicTemplate(self.dataPromise);
				break;
		}
	};

	return RenderBase;
});