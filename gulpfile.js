var gulp = require('gulp');
var sass = require('gulp-sass');
var preproc = require('gulp-less');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var ejs = require('gulp-ejs');
// var babel = require('gulp-babel');
var fs = require('fs');

gulp.task('grid', function () {
    return gulp.src('src/style/**/grid-system.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/style/'));
});

gulp.task('sass', function () {
    return gulp.src('src/style/**/*.scss')
        .pipe(sass())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/style/'));
});
gulp.task('preproc', function () {
    return gulp.src('src/precss/styles.less')
        .pipe(preproc())
        .pipe(autoprefixer({
            browsers: ['> 0.1%'],
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('dist/style/'));
});

gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js')
        // .pipe(babel({
        //     presets: ['es2015']
        // }))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulp.dest('./dist/js/'))
});

gulp.task('sections', ['preproc'], function () {
    var criticalStyle = fs.readFileSync('./dist/style/styles.css', 'utf8');
    var version = '4';
    return gulp.src('./src/*.ejs')
        .pipe(ejs({criticalStyle: criticalStyle, version: version}, {}, {ext: '.html'}))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('assets', function () {
    gulp.src(['./src/img/**/*'])
        .pipe(gulp.dest('./dist/img'))
});

gulp.task('fonts', function () {
    gulp.src(['./src/fonts/**/*'])
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('watch', ['default'], function () {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/**/*.ejs', ['sections']);
    gulp.watch('src/style/**/*.scss', ['sass', 'sections']);
    gulp.watch('src/style/**/*.less', ['preproc']);
    gulp.watch('src/img/**/*', ['assets']);
});


gulp.task('default', ['sass','preproc', 'assets', 'scripts', 'sections', 'fonts', 'grid']);