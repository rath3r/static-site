module.exports = function(grunt){
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		settings: {
            app: 'assets',
            dist: 'wwwroot',
            templates: 'templates',
            temp: '.tmp'
        },
		banner: '/*!\n' +
			'* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'*/\n',
		assemble: {
			options: {
				assets: 'assets',
				layoutdir: '<%= settings.templates %>/layouts'
			},
			site: {
				options: {
					layout: 'index.hbs',
					flatten: 'true'
				},
				src: ['<%= settings.templates %>/*.hbs'],
				dest: '<%= settings.dist %>/'
			}
			//options: {
			//assets: 'wwwroot',
			//flatten: false,
			//expand: true,
			//layoutdir: '<%= settings.templates %>',
			//layout: 'index.hbs'
			//},
			//dev: {
			//options: {
			//dev: true,
			//prod: false
			//},
			//src: ['<%= settings.templates %>/**/*.hbs'],
			//dest: '<%= settings.dist %>/'
			//}
		},
		less: {
			dev: {
				src: [
					'<%= settings.app %>/bootstrap/css/*.css',
					'<%= settings.app %>/less/main.less',
				],
				dest: '<%= settings.temp %>/css/main.css',
			}
		},
		concat: {
			options: {
				stripBanners: true,
				banner: '<%= banner %>'
			},
			main: {
				src: [
					'<%= settings.app %>/js/app.js',
					'<%= settings.app %>/js/test.js'
				],
				dest: '<%= settings.dist %>/js/app.js',
			},
			libs: {
				src: [
					'<%= settings.app %>/js/libs/*.js'
				],
				dest: '<%= settings.dist %>/js/libs.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= banner %>'
			},
			main: {
				src: ['<%= concat.main.dest %>'],
				dest: '<%= settings.dist %>/js/app.min.js'
			},
			libs: {
				src: ['<%= concat.libs.dest %>'],
				dest: '<%= settings.dist %>/js/libs.min.js'
			}
		},
		jshint: {
			gruntfile: ['Gruntfile.js'],
			beforeconcat: ['assets/js/*.js'],
			afterconcat: ['wwwroot/js/app.js']
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						flatten: false,
						cwd: '<%= settings.app %>',
						dest: '<%= settings.dist %>',
						src: [
							'*.{ico,png,txt}',
							'.htaccess',
							'images/email/{,*/}*.{jpg,svg}'
							//'fonts/{,*/}*.*'
						]
				 	}
				]
			},
            fonts: {
                expand: true,
                flatten: false,
                cwd: '<%= settings.app %>/fonts',
                dest: '<%= settings.dist %>/fonts/',
                src: '{,*/}*.*'
            },
            dev: {
				expand: true,
                flatten: false,
                cwd: '<%= settings.app %>',
                dest: '<%= settings.dist %>/',
                src: [
					'/images/email/*.{jpg,svg}'
				]
            }
		},
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= settings.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= settings.dist %>/images'
                }]
            }
        },
		clean: {
			build: {
				src: [
					"<%= settings.dist %>",
					"<%= settings.temp %>"
				]
			}
		},
		autoprefixer: {
			// prefix the specified file
			single_file: {
				src: '<%= settings.temp %>/css/main.css',
				dest: '<%= settings.dist %>/css/main.css'
			}
		},
		svgmin: {                       // Task
			dist: {
				files: {                                    // Dictionary of files
					'<%= settings.dist %>/images': 'images/'     // 'destination': 'source'
				}
			}
        },
		watch: {
			assemble: {
				files: ['templates/**/*.hbs'],
				tasks: ['assemble']
			},
            less : {
                files : 'assets/less/**',
                tasks : [ 'less:dev' ]
            },
			autoprefixer : {
				files : '<%= settings.temp %>/css/*.css',
				tasks : [ 'autoprefixer:single_file' ]	
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
			},
			//imagemin: {
			//files: '<%= settings.assets %>/images',
			//tasks: ['imagemin:dev']
			//},
			copy:{
				files: '<%= concat.main.src %>/email',
				tasks: ['copy:dev']
			},
			svgmin: {
				files: '<%= settings.assets %>/images',
				tasks: ['svgmin']	
			}
        }
	});
	
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('dp-grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-svgmin');

	grunt.registerTask('css', [
		'less:dev',
		'autoprefixer:single_file'
	]);

	grunt.registerTask('js', ['concat', 'uglify']);

	grunt.registerTask('testTarget', [
		'clean',
		'copy:dist',
	]);	

	grunt.registerTask('fonts', ['copy:files']);

	grunt.registerTask('default', [
		'clean',
		'assemble',
		'css',
		'js',
		'copy:dist',
		//'imagemin:dev',
		//'svgmin'
	]);

};