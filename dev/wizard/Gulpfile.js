/**
 * @author    姚尧 <yaogaoyu@qq.com>
 * @copyright © 2015 DaHao.de
 * @license   GPL-3.0+
 */

var $gulp = require('gulp'),
    $lint = require('gulp-tslint'),
    $smap = require('gulp-sourcemaps'),
    $sass = require('gulp-sass'),
    $tsc = require('gulp-typescript'),
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
        css: 'share/scss/wizard.scss',
        scss: ['share/scss/*.scss'],
        js: 'lib/Wizard.ts',
        ts: ['lib/**/*.ts', 'lib/**/*.tsx']
    },
    dst = {
        _: 'var/build',
        prod: '../../src/main/webapp/share/static/wizard'
    };
dst.js = dst.css = dst.prod;

$gulp.task('clear', function () {
    $del(dst._ + '/*');
});

$gulp.task('css', function () {
    return $gulp.src(src.css)
        .pipe($smap.init())
        .pipe(
        $sass({outputStyle: 'compressed'})
            .on('error', $sass.logError)
    )
        .pipe($rename(pkg.version + '.min.css'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst.css));
});

$gulp.task('js:lint', function () {
    return $gulp.src(src.ts)
        .pipe($lint())
        .pipe($lint.report('prose'));
});

$gulp.task('js:compile', function () {
    var ts = $gulp.src(src.js)
        .pipe($smap.init())
        .pipe($tsc($tsc.createProject('tsconfig.json', {
            outFile: pkg.name + '.js',
            typescript: require('typescript')
        })));
    return ts.js
        .pipe($replace(/\$\{WIZARD_VERSION\}/, pkg.version))
        .pipe($insert.append('module.exports=Wizard;'))
        .pipe($smap.write('.'))
        .pipe($gulp.dest(dst._));
});

$gulp.task('js', ['js:lint', 'js:compile'], function () {
    return $browserify({
        debug: true,
        detectGlobals: false
    })
        .require('./' + dst._ + '/' + pkg.name, {
            expose: 'wizard'
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

$gulp.task('js:debug', ['js:lint', 'js:compile'], function () {
    return $browserify({
        debug: true,
        detectGlobals: false
    })
        .require('./' + dst._ + '/' + pkg.name, {
            expose: 'wizard'
        })
        .bundle()
        .pipe($source(pkg.version + '.min.js'))
        .pipe($buffer())
        .pipe($gulp.dest(dst.js));
});

$gulp.task('bundle', ['css', 'js']);

$gulp.task('watch', function () {
    $gulp.watch(src.scss, ['css']);
    $gulp.watch(src.ts, ['js:debug']);
});

$gulp.task('default', ['bundle']);

