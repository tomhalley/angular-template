'use strict';

var gulp = require('gulp'),
    inject = require('gulp-inject'),
    sass = require('sass'),
    webServer = require('gulp-webserver'),
    livereload = require('gulp-livereload'),
    manifest = require('./sources.json');

var target = gulp.src("app/index.html");

gulp.task('build js dev', function() {
  return target
    .pipe(inject(gulp.src(manifest.js.dev), {ignorePath: '/app'}))
    .pipe(gulp.dest("app"));
});

gulp.task('build css', function() {
  return target
    .pipe(inject(gulp.src(manifest.css, {read: false}), {ignorePath: '/app'}))
    .pipe(gulp.dest("app"));
});

gulp.task('build:css', function() {
  return gulp.src('app/**/*.sass')
    .pipe(sass())
    .pipe(gulp.dest('app/dest'));
});

gulp.task('build:index', function() {
  return target
    .pipe(inject(gulp.src(manifest.css.concat(manifest.js.dev), {read: false}), {ignorePath: '/app'}))
    .pipe(gulp.dest("app"));
});

gulp.task('watch:index', function() {
  gulp.watch('sources.json', ['build:index']);
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('app/**/*.js', ['build js dev']);
});

gulp.task('start', function() {
  return gulp.src('app')
    .pipe(webServer({
      port: 8000,
      fallback: 'index.html',
      open: '/'
    }));
});

gulp.task('build:dev', ['build js dev', 'build css']);