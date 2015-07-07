(function () {
	var bowerPath = '/asset/bower_components/';
	var modulePath = 'modules/';

	requirejs.config({
		baseUrl: '/asset/js',
		paths: {
			'jquery': bowerPath + 'jquery/jquery.min',
			'react': bowerPath + 'react/react.min',
			'JSXTransformer': bowerPath + 'react/JSXTransformer',
			'text': bowerPath + 'requirejs-text/text',
			'jsx': bowerPath + 'requirejs-react-jsx/jsx'
		},
		packages: [
			{
				name: 'lottery',
				location: modulePath + 'lottery',
				main: 'show'
			},
			{
				name: 'less',
				location: bowerPath + 'require-less',
				main: 'less'
			}
		]
	});

	requirejs(['jsx!lottery', 'less!/asset/less/main']);
})();