module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*!\n' +
			'* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'*/\n',
		assemble: {
			options: {
				assets: 'wwwroot',
				flatten: true,
				layout: 'index.hbs',
				layoutdir: 'templates/layouts',
				partials: ['templates/partials/**/*.{hbs,md}']
			},
			dev: {
				options: {
				dev: true,
				prod: false
			},
				src: ['templates/*.hbs'],
				dest: 'wwwroot/'
			},
			prod: {
				options: {
				dev: false,
				prod: true
			},
				src: ['templates/*.hbs'],
				dest: 'wwwroot/'
			}
		},
		less: {
			dev: {
				src: ['assets/less/main.less'],
				dest: 'wwwroot/css/main.css',
			},
			production: {
				options: {
				paths: ["assets/css"],
				yuicompress: true
			},
			files: {
					"path/to/result.css": "path/to/source.less"
				}
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			main: {
				src: [
					'assets/js/app.js',
					'assets/js/test.js'
				],
				dest: 'wwwroot/js/app.js',
			},
			libs: {
				src: [
					'assets/js/libs/*.js'
				],
				dest: 'wwwroot/js/libs.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			main: {
				src: ['<%= concat.main.dest %>'],
				dest: 'wwwroot/js/app.min.js'
			},
			libs: {
				src: ['<%= concat.libs.dest %>'],
				dest: 'wwwroot/js/libs.min.js'
			}
		},
		jshint: {
			gruntfile: ['Gruntfile.js'],
			beforeconcat: ['assets/js/*.js'],
			afterconcat: ['wwwroot/js/app.js']
		},
		watch: {
			assemble: {
				files: ['templates/**/*.hbs'],
				tasks: ['assemble:dev']
			},
            less : {
                files : 'assets/less/**',
                tasks : [ 'less:dev' ]
            },
            gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile']
			},
            test: {
				files: '<%= concat.main.src %>',
				tasks: ['jshint:beforeconcat']
			},
			concat: {
				files: '<%= concat.main.src %>',
				tasks: ['concat']
			},
			min: {
				files: '<%= concat.main.dest %>',
				tasks: ['jshint:afterconcat']
			}
        }
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('assemble');

	grunt.registerTask('css', ['less:dev']);

	grunt.registerTask('js', ['concat', 'uglify']);

	grunt.registerTask('templates', ['assemble:dev']);	

	grunt.registerTask('default', ['css', 'js', 'templates']);

};