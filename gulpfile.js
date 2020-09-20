// gulp and gulp plugins
const gulp = require('gulp');
const gulpif = require('gulp-if');
const clean_css = require('gulp-clean-css');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const envify = require('gulp-envify');
const connect = require('gulp-connect');
const livereload = require('gulp-livereload');

// vinyl
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// browserify
const browserify = require('browserify');
const watchify = require('watchify');
const hmr = require('browserify-hmr');
const babelify = require('babelify');
const envifyify = require('envify/custom');
const uglifyify = require('uglifyify');

// options
const env = 'production';

const babelOpts = {
    "presets": [
        "@babel/env",
        "@babel/react"
    ],
    "plugins": [
        "@babel/plugin-proposal-class-properties"
    ],
    "env": {
        "development": {
            "plugins": [
                'react-hot-loader/babel'
            ]
        }
    }
};

const uglifyOpts = {};

const htmlMinOpts = {
    collapseWhitespace: true
};

const envifyOpts = {
    NODE_ENV: env
};

// the index.html files
gulp.task('html', () => {
    return gulp
        .src('src/index.html')
        .pipe(gulpif(env === 'production', htmlmin(htmlMinOpts)))
        .pipe(gulpif(env === 'development', livereload()))
        .pipe(gulp.dest('build/'));
});

// .sass files
gulp.task('css', () => {
    return gulp
        .src('src/style.sass')
        .pipe(sass())
        .pipe(gulpif(env === 'production', clean_css()))
        .pipe(gulpif(env === 'development', livereload()))
        .pipe(gulp.dest('build/'));
});

gulp.task('js', () => {
    const browserifyArgs = Object.assign({}, {
        entries: ["src/app.js"]
    });

    const b = browserify(browserifyArgs)
        .plugin(watchify)
        .transform(babelify, Object.assign({}, babelOpts))
        .transform(envifyify(envifyOpts));

    if (env === 'production') {
        b.transform(uglifyify, uglifyOpts);
    }

    if (env === 'development') {
        b.plugin(hmr, {disableHostCheck: true});
    }

    function bundle() {
        return b.bundle()
            .on("error", function (err) {
                console.error(err);
                this.emit("end");
            })
            .pipe(source("app.js"))
            .pipe(buffer())
            .pipe(envify(envifyOpts))
            .pipe(gulpif(env === 'production', uglify()))
            .pipe(gulp.dest('./build/'));
    }

    b.on("update", bundle);

    return bundle();
});

gulp.task('res', () => {
    return gulp
        .src('res/**/*')
        .pipe(gulp.dest('build/'));
});

// build all
gulp.task('build', gulp.series(
    'res',
    'html',
    'css',
    'js'
));

// start watching all files that are subject to change
gulp.task('watch', () => {
    gulp.watch('src/index.html', gulp.series('html'));
    gulp.watch('src/style.sass', gulp.series('css'));
    livereload.listen();
});

// start a webserver with livereload in app directory
gulp.task('run-webserver', () => {
    return connect.server({
        root: 'build',
        livereload: true,
        port: 8082
    });
});

gulp.task('debug', gulp.series('build', gulp.parallel('watch', 'run-webserver')));