// npm install --save-dev gulp browserify babel babel-cli babel-preset-es2015 babelify del vinyl-source-stream vinyl-buffer gulp-uglify gulp-sass gulp-autoprefixer gulp-cssnano gulp-concat browser-sync breakpoint-sass ejs gulp-ejs

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var ejs = require('gulp-ejs');
var imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var paths = {
    src: {
        sass: ['./src/sass/**/*.sass'],
        js: ['./src/js/**/*.js'],
        img: ['./src/images/**/*'],
        appJs: ['./src/js/index.js'],
        html: ['./src/views/**/*.ejs']
    },
    dest: {
        dist: './',
        css: './build/css',
        js: './build/js',
        img: './build/img',
        html: './build/html/'
    },
    breakpointStylesheets: './node_modules/breakpoint-sass/stylesheets',
    normalizeStylesheets: './node_modules/normalize.css'
};

gulp.task('clean:css', function(done) {
    return del(['./build/css/**/*.css'], done);
});

gulp.task('clean:js', function(done) {
    return del(['./build/js/**/*.js'], done);
});

gulp.task('sass', ['clean:css'], function() {
    return gulp.src(paths.src.sass)
        .pipe(sass({
            includePaths: [
                paths.breakpointStylesheets,
                paths.normalizeStylesheets
            ]
        })).on('error', sass.logError)
        .pipe(autoprefixer())
        .pipe(cssnano({
            zindex: false
        }))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(paths.dest.css))
        .pipe(browserSync.stream());
});

gulp.task('js', ['clean:js'], function() {
    return browserify({
        entries: paths.src.appJs,
        extensions: ['.js'],
        debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.js))
        .on('end', reload);
});

gulp.task('ejs', function() {
  return gulp.src(paths.src.html)
    .pipe(ejs({
        msg: "Hello Gulp!"
    }, {
        ext: '.html'
    }))
    .pipe(gulp.dest(paths.dest.html));
});

gulp.task('image', function() {
    return gulp.src(paths.src.img)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dest.img))
});

// Reload html file when changes are saved
gulp.task('html', function() {
  return gulp.src(paths.src.html)
      .on('end', reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: "./"
    });

    gulp.watch(paths.src.sass, ['sass']);
    gulp.watch(paths.src.js, ['js']);
    gulp.watch(paths.src.html, ['ejs', 'html']);
});

// The default task (called when we run `gulp` from cli)
gulp.task('default', ['js', 'sass', 'ejs', 'image'], function() {
    gulp.run('serve');
});
