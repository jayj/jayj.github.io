/* globals module, require */

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
                livereload: false
            },
            site: {
                files: [
                    'index.kit',
                    'includes/*',
                    'pages/*'
                ],
                tasks: [ 'codekit' ]
            },
            js: {
                files: [ 'js/*.js' ],
                tasks: [ 'jshint:js' ]
            },
            css: {
                files: [ 'scss/{,*/}*.scss' ],
                tasks: [ 'sass', 'autoprefixer' ]
            },
            images: {
                files: [ 'images/{,*/}*' ],
                tasks: [ 'imagemin' ]
            },
            svgIcons: {
                files: [ 'svg/*.svg' ],
                tasks: [ 'svgstore', 'codekit' ]
            },
            grunt: {
                files: [ 'Gruntfile.js' ],
                tasks: [ 'jshint:grunt' ]
            }
        },

        // Compile .kit files to HTML
        codekit: {
            global: {
                files : {
                    'index.html' : 'index.kit'
                }
            },
        },

        // Compile Sass
        sass: {
            global: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },

        // Autoprefix the compiled CSS
        autoprefixer: {
            global: {
                src: 'css/main.css',
                dest: 'css/main.css'
            }
        },

        // Make sure there are no obvious mistakes in the JS files
        jshint: {
            js: {
                src: [ 'js/*.js' ]
            },
            grunt: {
                src: [ 'Gruntfile.js' ]
            }
        },

        // Minify images
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    dest: 'images/',
                    src: [ '**/*.{png,jpg,gif}' ]
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
                    'includes/svg-defs.svg': [ 'svg/*.svg' ]
                }
            }
        },

    });


    // Default task
    grunt.registerTask( 'default', [ 'sass', 'autoprefixer', 'svgstore', 'codekit', 'watch' ] );

    grunt.registerTask( 'svg', [ 'svgstore', 'codekit' ] );

};
