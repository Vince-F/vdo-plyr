module.exports = function(grunt) {

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ngdoc');
	
	grunt.initConfig({
		concat: {
			js_debug: {
				options: {
					separator: ";\n",
					sourceMap: true
				},
				src: ["src/modules/**/*.js","src/services/**/*.js","src/controllers/**/*.js","src/directives/**/*.js","src/main.js"],
				dest: 'dist/vdo_plyr.dbg.js'
			},
			js_release: {
				options: {
					separator: ";\n"
				},
				src: ["src/modules/**/*.js","src/services/**/*.js","src/controllers/**/*.js","src/directives/**/*.js","src/main.js"],
				dest: 'dist/vdo_plyr.js'
			},
			css: {
				options: {
					separator: "\n"
				},
				src: ["src/**/*.css"],
				dest: 'dist/vdo_plyr.css'
			}
		},
		jshint: {
			files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			options: {
				globals: {
					
				}
			}
		},
		uglify: {
			options: {
				screwIE8: true,
			},
			release:{
				files: {
					'dist/vdo_plyr.min.js':['dist/vdo_plyr.js']
				}
			}
		},
		cssmin: {
			options: {
				
			},
			release: {
				files: {
					'dist/vdo_plyr.min.css':['dist/vdo_plyr.css']
				}
			}
		},
		ngdoc: {
			all: ['src/**/*.js']
		},
		watch: {
			files: ['src/**/*.js','src/**/*.css'],
			tasks: ['concat:js_debug',"concat:css"]
		}
	});
	
	grunt.registerTask('code-quality', ['jshint','plato','jsinspect','ngdoc']);
	grunt.registerTask('compile-debug', ['concat:js_debug','concat:css']);
	grunt.registerTask('compile-release', ["jshint",'concat:js_release','uglify',"concat:css","cssmin"]);
	grunt.registerTask('default', ["jshint",'plato','jsinspect','ngdoc','concat:js_release','uglify',"concat:css","cssmin"]);
	grunt.registerTask('code-duplication', ["jsinspect"]);
	grunt.registerTask('doc', ["ngdoc"]);
};