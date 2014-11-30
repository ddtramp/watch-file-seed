'use strict'; 

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    var appConfig = {
        app: require('./package.json').appPath || 'app',
        dist: 'dist'
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= pkg.appPath %>/{,*/}*.html',
                    '<%= pkg.appPath %>/styles/{,*/}*.css',
                    '<%= pkg.appPath %>/scripts/{,*/}*.js',
                    '<%= pkg.appPath %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '<%= pkg.ipAddress %>',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(appConfig.app) // can not use <%= pkg.appPath %> get bath path
                        ];
                    }
                }
            }
        }

    });

    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            grunt.log.warn('sorry, i can not config run this server, you can add some task for this...');
            return;
        }
        grunt.task.run([
            "connect:livereload",
            "watch"
        ]);
    });
    grunt.registerTask('server', 'DEPERCATED TASK, Use the "serve" task instead', function (target) {
        grunt.log.warn('the `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', []);

    grunt.registerTask('build', []);

    grunt.registerTask('default', [
        'serve'
    ]);

}