// ========================================
// Gulpfile
// ========================================
var css_path  = '../../public-html/css/';
// load plugins
var gulp =              require('gulp'),
    sass =              require('gulp-sass'),
    sourcemaps =        require('gulp-sourcemaps'),
    notify =            require('gulp-notify'),
    plumber =           require('gulp-plumber'),
    rename =            require('gulp-rename'),
    postcss =           require('gulp-postcss'),
    autoprefixer =      require('autoprefixer'),
    svgfragments =      require('postcss-svg-fragments')
    cssnano =           require('cssnano'),
    concat =            require('gulp-concat'),
    uglify =            require('gulp-uglify'),
    runSequence =       require('run-sequence'),
    del =               require('del');

var paths = {
    styles:  ['sass/**/*.scss'], //used for watch task
                                    
}

/**
 * Error notification settings for plumber
 */
var plumberErrorHandler = {
    errorHandler: notify.onError({
    message: "Error: <%= error.message %>"
  })
};

/**
 * Runnig sass for css that is going to be inlined in head
**/
gulp.task('sass', function() {
    var plugins = [
        autoprefixer({
            browsers: ['last 2 versions', 'ie 9', 'ie 10'],
            cascade: false
        })
    ];
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss( plugins ))
        .pipe(sourcemaps.write('../../css'))
        .pipe(gulp.dest(css_path))
        .pipe(gulp.dest('.tmp'))
});


/**
 * Clean up the CSS files.
 */
gulp.task('clean-css', function(cb) {
    del([
        '.tmp/*.css',
        'public_html/dist/css/*.css',
        'public_html/dist/css/*.map',
        '../css/*.css',
        '../css/*.map'
    ], {force: true}, cb) //force true added to force to delete files outside this folder
});

/**
 * Set the task run order for style tasks
 */
gulp.task('styles', function(callback) {
    runSequence(
        'clean-css',
        'sass',
       // 'minifycss',
    callback);
});

/**
 * Set the task run order for script tasks
 */
/* Not needed for Jellyfish Webinar Series : IBM Webinar Site
gulp.task('scripts', function() {
    runSequence(
        'clean-js',
        'minify-scripts'
    );
});
*/


/**
 * Create the watch listener
 */
gulp.task('watch', function() {
    gulp.watch(paths.styles, ['styles']);
    //gulp.watch(paths.scripts, ['scripts']);
});



/**
 * Set the default task to furst run styles, then scripts and then watch for
 * changes to the JS or SASS files.
 */
gulp.task('default', function (callback) {
    runSequence(
        'styles',
        //'scripts',
        //'watch',
        callback
    );
});