requirejs.config({
	baseUrl: 'asset/js',
	paths: {
		'jquery': 'bower_components/jquery/jquery.min',
		'react': 'bower_components/react/react',
		'JSXTransformer': 'bower_components/react/JSXTransformer',
		'text': 'bower_components/requirejs-text/text',
		'jsx': 'bower_components/requirejs-react-jsx/jsx'
	},
	shim: {
		"react": {
			"exports": "React"
		},
		"JSXTransformer": "JSXTransformer"
	},

	config: {
		jsx: {
			fileExtension: ".jsx",
			transformOptions: {
				harmony: true,
				stripTypes: false,
				inlineSourceMap: true
			},
			usePragma: false
		}
	},
	packages: [
		{
			name: 'hashService',
			location: 'modules/hash-service',
			main: 'load'
		},
		{
			name: 'lottery',
			location: 'modules/lottery',
			main: 'main'
		},
		{
			name: 'less',
			location: 'bower_components/require-less',
			main: 'less'
		},
		{
			name: 'poly',
			location: 'bower_components/poly',
			main: 'poly'
		},
		{
			name: 'when',
			location: 'bower_components/when',
			main: 'when'
		},
		{
			name: 'moment',
			location: 'bower_components/moment',
			main: 'moment'
		}
	]
});
requirejs(['lottery', 'hashService', 'less!styles/main'], function (Lottery, HashService) {
	var lottery = new Lottery();
	var hashService = new HashService({
		show: {
			weave: lottery.show()
		}
	});
	lottery.start();
});