/**
 * @author    姚尧 <yaogaoyu@qq.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

var $gulp = require('gulp'),
    $smap = require('gulp-sourcemaps'),
    $sass = require('gulp-sass'),
    $rename = require('gulp-rename'),
    $insert = require('gulp-insert'),
    $replace = require('gulp-replace'),
    $del = require('del'),
    $browserify = require('browserify'),
    $source = require('vinyl-source-stream'),
    $buffer = require('vinyl-buffer'),
    $uglify = require('gulp-uglify'),
    pkg = require('./package.json'),
    src = {
        css: 'scss/www.scss',
        scss: ['scss/*.scss'],
        js: './lib/www.js',
        jsLib: ['lib/*.js']

    },
    dst = {
        _: 'var/build',
        prod: {
            css : '../../src/main/webapp/share/static/css',
            js : '../../src/main/webapp/share/static/js'
        }
    };
dst.css = dst.prod.css;
dst.js = dst.prod.js;

$gulp.task('clear', function () {
    $del(dst._ + '/*');
    $del(dst.prod.css + '/*');
    $del(dst.prod.js + '/*');
});

$gulp.task('css', function () {
    return $gulp.src(src.css)
        .pipe($smap.init())
        .pipe($sass({outputStyle: 'compressed'}).on('error', $sass.logError))
        .pipe($rename(pkg.version + '.min.css'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst.css));
});

$gulp.task('js', function () {
    return $browserify({
        debug: true,
        detectGlobals: false
    })
        .require(src.js, {
            expose: 'www'
        })
        .bundle()
        .pipe($source(pkg.version + '.min.js'))
        .pipe($buffer())
        .pipe($smap.init({
            loadMaps: true
        }))
        .pipe($uglify())
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst.js));
});

$gulp.task('js:debug', function () {
    return $browserify({
        debug: true,
        detectGlobals: false
    })
        .require(src.js, {
            expose: 'www'
        })
        .bundle()
        .pipe($source(pkg.version + '.min.js'))
        .pipe($buffer())
        .pipe($insert.append('$().ready(function(){require("www");});\n')).pipe($buffer())
        .pipe($gulp.dest(dst.js));
});

$gulp.task('bundle', ['css', 'js']);

$gulp.task('watch', function () {
    $gulp.watch(src.scss, ['css']);
    $gulp.watch(src.jsLib, ['js:debug']);
});

$gulp.task('default', ['bundle']);

