const { fork } = require('child_process');
const path = require('path');
const gulp = require('gulp');
const less = require('gulp-less');
const tsc = require.resolve('typescript/bin/tsc');
const rename = require('gulp-rename');
const fs = require('fs-extra');
const copyNodeModules = require('copy-node-modules');

function compileLess() {
  return gulp.src([
    '../src/**/*.less',
   ])
  .pipe(less())
  .pipe(rename({
    extname: '.acss',
  }))
  .pipe(gulp.dest('../dist'));
}

function compileTS(done) {
  fork(tsc, {
    stdio: 'inherit',
    cwd: '../src',
  });
  done();
}

function copyAssets() {
  return gulp.src([
    '../src/**/**',
    '!/**/*.ts',
    '!/**/*.less',
  ]).pipe(gulp.dest('../dist'));
}

function cleanDist(done) {
  fs.remove('../dist').then(() => {
    done();
  }).catch(err => {
    done(err);
  });
}

function copyPackages(done) {
  const src = path.join(__dirname, '..');
  const target = path.join(__dirname, '../dist');
  copyNodeModules(src, target, { devDependencies: false }, (err) => {
    if (err) {
      done(err);
      return;
    }
    done()
  });
}

exports.compileLess = compileLess;
exports.clean = cleanDist;

exports.default = gulp.series(cleanDist, gulp.parallel(copyPackages, copyAssets, compileLess, compileTS));
