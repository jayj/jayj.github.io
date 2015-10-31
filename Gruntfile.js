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

        // Process the compiled CSS
        postcss: {
            options: {
                // Source maps
                map: {
                    inline: false,
                    annotation: 'src/css/'
                },

                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
                ]
            },
            dev: {
                src: 'src/css/*.css'
            },
            build: {
                options: { map: false },
                src: 'build/css/*.css'
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
                    'includes/svg-defs.svg': [ 'svg/*.svg' ]
                }
            }
        },

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


    // Default task
    grunt.registerTask( 'default', [ 'sass', 'postcss:dev', 'svgstore', 'codekit', 'watch' ] );

    grunt.registerTask( 'build', [ 'sass', 'postcss:build', 'svgstore', 'codekit' ] );

    grunt.registerTask( 'svg', [ 'svgstore', 'codekit' ] );


};
