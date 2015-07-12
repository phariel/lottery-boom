module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		requirejs: {
			compile: {
				options: {
					baseUrl: 'src/asset_files/js',
					mainConfigFile: 'src/asset_files/js/main.js',
					dir: 'src/asset_files/dist/js',
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
		}
	});

	grunt.loadNpmTasks('grunt-contrib-requirejs');

	grunt.registerTask('default', ['requirejs']);
};