define(function (require) {
	var dltData = require('./dltData');
	var render = require('./render/base');

	function Lottery() {
		this.renderBase = new render(new dltData());
	}

	Lottery.prototype.start = function () {
		window.location.href = '#show';
	};

	Lottery.prototype.show = function () {
		this.renderBase.render('basic');
	};

	return Lottery;
});