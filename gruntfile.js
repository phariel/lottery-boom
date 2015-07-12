module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src/frontend/asset/js',
					mainConfigFile: 'src/frontend/asset/js/main.js',
					dir: 'built/dest',
					exclude: ['jsx'],
					optimize: 'uglify2',
					skipDirOptimize: true,
					findNestedDependencies: true,
					preserveLicenseComments: false,
					removeCombined: true,
					onBuildWrite: function (moduleName, path, singleContents) {
						return singleContents.replace(/jsx!/g, '');
					},

					modules: [
						{
							name: 'main',
							exclude: ['jsx']
						}
					]
				}
			}
		},
		copy: {
			main: {
				files: [
					{
						cwd: 'src/backend',
						src: '**/*',
						dest: 'built/backend',
						expand: true
					}, {
						cwd: 'src/frontend/template',
						src: '**/*',
						dest: 'built/frontend/template',
						expand: true
					}, {
						src: 'src/app.js',
						dest: 'built/app.js'
					},
					{
						src: 'built/dest/main.js',
						dest: 'built/frontend/asset/js/main.js'
					},
					{
						src: 'src/frontend/asset/js/bower_components/requirejs/require.js',
						dest: 'built/frontend/asset/js/require.js'
					}
				]
			}
		},
		clean: ['built']
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('default', ['clean', 'requirejs', 'copy']);
};