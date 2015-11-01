/* globals module, require */

var browserSync = require('browser-sync');

module.exports = function(grunt) {

    'use strict';

    // Load all grunt tasks
    require( 'load-grunt-tasks' )(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        // Watch for file changes
        watch: {
            options: {
                cwd: { files: 'src' },
                spawn: false
            },
            site: {
                files: ['index.kit', 'includes/**/*.kit', 'pages/**/*.kit'],
                tasks: ['codekit', 'bs-reload-all']
            },
            js: {
                files: ['js/*.js'],
                tasks: ['eslint:js', 'babel:dev', 'bs-reload-all']
            },
            css: {
                files: ['scss/**/*.scss'],
                tasks: ['sass', 'bs-reload-css']
            },
            svgIcons: {
                files: ['svg/*.svg'],
                tasks: ['svgstore', 'codekit', 'bs-reload-all']
            },
            grunt: {
                files: ['../Gruntfile.js'],
                tasks: ['eslint:grunt']
            }
        },

        // Compile .kit files to HTML
        codekit: {
            dev: {
                files: { 'src/index.html' : 'src/index.kit' }
            }
        },

        // Compile Sass
        sass: {
            dev: {
                options: {
                    outputStyle: 'expanded',
                    sourceMap: true
                },
                files: {
                    'src/css/main.css': 'src/scss/main.scss'
                }
            }
        },

        // Process the compiled CSS
        postcss: {
            options: {
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
                ]
            },
            build: {
                src: 'build/css/*.css'
            }
        },

        // Compile ES6 to ES5 using Babel
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            dev: {
                files: [{
                    expand: true,
                    src: ['src/js/*.es6.js'],
                    dest: '',
                    rename: function(dest, src) {
                        return dest + src.replace('.es6','');
                    }
                }]
            }
        },

        // Make sure there are no obvious mistakes in the JS files
        eslint: {
            js: {
                src: ['src/js/*.es6.js']
            },
            grunt: {
                src: ['Gruntfile.js']
            }
        },

        // Minify images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    dest: 'images/',
                    src: ['**/*.{png,jpg,gif}']
                }]
            }
        },

        // Merge SVGs from folder into a single file
        svgstore: {
            options: {
                prefix : 'icon-',
                cleanup: false,
                svg: {
                    style: 'display: none;'
                }
            },
            default: {
                files: {
                    'src/includes/svg-defs.svg': [ 'src/svg/*.svg' ]
                }
            }
        },

        // Copy files to build folder
        copy: {
            options: {},
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/',
                        src: [
                            'index.html',
                            'css/*.css',
                            'js/*.js',
                            '!js/*.es6.js',
                            'data/**/*',
                            'images/**/*'
                        ],
                        dest: 'build/'
                    },
                    {
                        flatten: true,
                        src: [
                            'bower_components/handlebars/handlebars.min.js',
                            'bower_components/single-page-nav/jquery.singlePageNav.min.js'
                        ],
                        dest: 'build/js/lib/'
                    },
                    {
                        src: 'CNAME',
                        dest: 'build/'
                    }
                ]
            }
        },

        clean: ['build/'],

        buildcontrol: {
            options: {
                dir: 'build',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'git@github.com:jayj/jayj.github.io.git',
                    branch: 'master'
                }
            },
            local: {
                options: {
                    remote: '../',
                    branch: 'build'
                }
            }
        }

    });

    /**
     * Init BrowserSync manually as I can't get grunt-browser-sync to watch files
     * http://www.shakyshane.com/javascript/nodejs/browser-sync/2014/08/24/browser-sync-plus-grunt/
     */
    grunt.registerTask('bs-init', function() {
        var done = this.async();
        browserSync({
            //server: './src'
            server: {
                baseDir: "src",
                routes: {
                    "/bower_components": "bower_components"
                }
            }
        }, function() {
            done();
        });
    });

    grunt.registerTask('bs-build', function() {
        var done = this.async();
        browserSync({
            server: './build',
            port: 3100
        }, function() {
            done();
        });
    });

    grunt.registerTask('bs-reload-css', function() {
        browserSync.reload(['*.css']);
    });

    grunt.registerTask('bs-reload-all', function() {
        browserSync.reload(true);
    });


    // Default task
    grunt.registerTask( 'default', [ 'sass', 'svgstore', 'codekit', 'babel' ] );

    grunt.registerTask( 'server', ['default', 'bs-init', 'watch'] );

    grunt.registerTask( 'build', [ 'sass', 'postcss:build', 'svgstore', 'codekit', 'babel', 'clean', 'copy' ] );

    grunt.registerTask( 'svg', [ 'svgstore', 'codekit' ] );
    grunt.registerTask( 'build-server', ['bs-build', 'watch'] ); // server doesn't work without watch task
};
