define(function (require) {
	var React = require('react');
	var poly = require('poly/array');
	var moment = require('moment');

	var DltSerial = React.createClass({
		render: function () {
			return (
				<div className="dlt-serial">
					<span>第</span>
					<span>{this.props.serial}</span>
					<span>期</span>
				</div>
			)
		}
	});

	var DltTime = React.createClass({
		render: function () {
			return (
				<div className="dlt-date">
					<span>{moment(new Date(parseInt(this.props.openDate, 10))).format('YYYY-MM-DD')}</span>
				</div>
			)
		}
	});

	var DltOpen = React.createClass({
		render: function () {
			var json = this.props.json;
			var section1 = json['section1'].split(',');
			var section2 = json['section2'].split(',');
			return (
				<div className="dlt-open">
					<div className="dlt-open-section1">
						{
							section1.map(function (v, i) {
								return (<span>{v}</span>)
							})
						}
					</div>
					<div className="dlt-open-section2">
						{
							section2.map(function (v, i) {
								return (<span>{v}</span>)
							})
						}
					</div>
				</div>
			)
		}
	});

	var Default = React.createClass({
		render: function () {
			return (
				<div className="dlt-default">
					<h2>大乐透基本视图</h2>
					{
						this.props.dltData.map(function (v, i) {
							return (
								<div className="dlt-row">
									<DltSerial serial={v['serial']}/>
									<DltOpen json={v['json']}/>
									<DltTime openDate={v['open_date']}/>
								</div>
							);
						})

					}
				</div>
			);
		}
	});

	function RenderDefault(dataPromise) {
		dataPromise.then(function (data) {
			console.log(data);
			React.render(
				<Default dltData={data} />,
				document.getElementById('app')
			);
		});
	}

	return RenderDefault;
});