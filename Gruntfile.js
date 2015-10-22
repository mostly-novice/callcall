module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-bower-install');

    var _ = require('lodash');

    grunt.initConfig({

      bowerInstall: {
       
        target: {
       
          // Point to the files that should be updated when 
          // you run `grunt bower-install` 
          src: [
            'app/views/**/*.html',   // .html support... 
          ],
       
          // Optional: 
          // --------- 
          cwd: '',
          dependencies: true,
          devDependencies: false,
          exclude: [],
          fileTypes: {},
          ignorePath: '',
          overrides: {}
        }
      },

      express: {
        options: {
          // Override defaults here
          node_env: 'test',
        },
        dev: {
          options: {
            script: 'app/bin/www'
          }
        },
        prod: {
          options: {
            script: 'app/app.js',
            node_env: 'production'
          }
        },
        test: {
          options: {
            script: 'app/app.js'
          }
        }
      },

      watch: {
          express: {
            files:  [ '**/*.js',
                      '**/*.html'],
            tasks:  [ 'express:dev' ],
            options: {
              // lifereload: true, // figure this out later
              spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
            }
          }
        }
    });

    // grunt.registerTask('default', ['express:dev']);
    grunt.registerTask('server', [ 'express:dev', 'watch' ])

}