/* globals module, require */

module.exports = function(grunt) {

    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON( "package.json" ),

        sass: {
            global: {
                options: {
                    style: "expanded"
                },
                files: {
                    "css/main-unprefixed.css": "scss/main.scss"
                }
            }
        },

        autoprefixer: {
            global: {
                src: "css/main-unprefixed.css",
                dest: "css/main.css"
            }
        },

        shell: {
            jekyllServe: {
                command: "jekyll serve --baseurl="
            },
            jekyllBuild: {
                command: "jekyll build"
            }
        },

        watch: {
            options: {
                livereload: false
            },
            site: {
                files: [
                    "index.html",
                    "about.md",
                    "_layouts/*.html",
                    "_posts/*",
                    "_projects/*",
                    "_includes/*.html"
                ],
                tasks: [ "shell:jekyllBuild" ]
            },
            js: {
                files: [ "js/*.js" ],
                tasks: [ "shell:jekyllBuild" ]
            },
            css: {
                files: [ "scss/*.scss" ],
                tasks: [ "sass", "autoprefixer", "shell:jekyllBuild" ]
            },
            svgIcons: {
                files: [ "svg/*.svg" ],
                tasks: [ "svgstore", "shell:jekyllBuild" ]
            }
        },

        svgstore: {
            options: {
                prefix : "shape-",
                cleanup: false,
                svg: {
                    style: "display: none;"
                }
            },
            default: {
                files: {
                    "_includes/svg-defs.svg": [ "svg/*.svg" ]
                }
            }
        }

    });

  require( "load-grunt-tasks" )(grunt);

  grunt.registerTask( "serve", [ "shell:jekyllServe" ] );
  grunt.registerTask( "default", [ "sass", "autoprefixer", "svgstore", "shell:jekyllBuild", "watch" ] );

};
