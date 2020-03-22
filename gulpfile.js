const gulp = require('gulp');
const { series } = require('gulp');
const { parallel } = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const pug = require('gulp-pug');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const notify = require("gulp-notify");

sass.compiler = require('node-sass');

const scssFiles = [
    './src/css/fonts.scss',
    './src/css/main.scss',
    './src/css/media.scss'
]

function pugbuild() {
    return gulp.src('./src/pug/pages/**/*.pug')
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return {
                    title: 'Pug',
                    message: err.message
                }
            })
        }))
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
}


function compress() {
    return gulp.src('./src/img/*')
    .pipe(plumber())
    .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./build/img'))
    .pipe(browserSync.stream());
  };

function fonts() {
    return gulp.src('./src/fonts/*.ttf')
    .pipe(gulp.dest('./build/fonts'))
    .pipe(browserSync.stream());
}

function libs() {
    return gulp.src('./src/libs/**/*.*')
    .pipe(gulp.dest('./build/libs'))
    .pipe(browserSync.stream());
}

function svg() {
    return gulp.src('./src/svg/**/*.*')
    .pipe(gulp.dest('./build/svg'))
    .pipe(browserSync.stream());
}

function styles() {
    return gulp.src(scssFiles)
    .pipe(plumber({
        errorHandler: notify.onError(function(err) {
            return {
                title: 'Styles',
                message: err.message
            };
        })
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(concat('main.css'))
    .pipe(sourcemaps.write())
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('./babel/js/main.js')
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.stream());
}

function clean() {
    return del(['build/*']);
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch('./src/css/*.scss', styles);
    gulp.watch('./src/js/*.js', scripts);
    gulp.watch('./src/libs/**/*.*', libs);
    gulp.watch('./src/pug/**/*.*', pugbuild);
    gulp.watch('./src/img/**/*.*', compress);
    gulp.watch('./src/fonts/**/*.*', fonts);
    gulp.watch('./src/svg/**/*.*', svg);

}

function build() {
    return (gulp.task('build', gulp.series(clean, gulp.parallel(pugbuild, styles, fonts, libs, compress, svg, scripts))));
}

exports.pugbuild = pugbuild;
exports.svg = svg;
exports.compress = compress;
exports.libs = libs;
exports.fonts = fonts;
exports.styles = styles;
exports.scripts = scripts;
exports.del = clean;
exports.watch = watch;
exports.build = series(clean, parallel(pugbuild, styles, fonts, libs, svg, compress, scripts));
