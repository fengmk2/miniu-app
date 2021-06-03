const path = require('path');
const { fork } = require('child_process');
const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const TscWatchClient = require('tsc-watch/client');
const watch = new TscWatchClient();
const fs = require('fs-extra');

function path2Dist(p) {
  const ext = path.extname(p);
  const basename = path.basename(p, ext);
  const extMap = {
    '.less': '.acss',
    '.ts': '.js',
  }
  
  return path.join(
    '../dist',
    path.relative('../src', path.dirname(p)),
    `${basename}${extMap[ext] ? extMap[ext] : ext}`
  );
}

function startMiniu(done) {
  const cp = fork(path.join(__dirname, '../node_modules/miniu/bin/miniu.js'), ['dev'], {
    stdio: 'inherit',
    cwd: '..',
  });

  cp.on('exit', () => {
    process.exit(0);
  });

  process.on('SIGINT', () => {
    cp.kill();
  });

  done();
}

function watchTS(done) {
  watch.on('first_success', () => {
    done();
  });
   
  watch.start('--project', '..');
}

function compileLess(p) {
  return gulp.src(path.join(__dirname, p))
    .pipe(less())
    .pipe(rename({
      extname: '.acss',
    }))
    .pipe(gulp.dest(path.join(path2Dist(p), '..')));
}

function unlink(p) {
  fs.removeSync(path2Dist(p))
}

function watchLess(done) {
  const watcher = gulp.watch([
    '../src/**/*.less',
  ], { ignoreInitial: false });

  watcher.on('add', compileLess);

  watcher.on('change', compileLess);

  watcher.on('unlink', unlink);

  done();
}

function watchAssets(done) {
  const watcher = gulp.watch([
    '../src/**/**',
    '!../src/**/*.less',
    '!../src/**/*.ts'
  ], { ignoreInitial: false });

  watcher.on('add', function copy(p) {
    return gulp.src(path.join(__dirname, p)).pipe(gulp.dest(path.join(path2Dist(p), '..')));
  });

  watcher.on('change', function copy(p) {
    return gulp.src(path.join(__dirname, p)).pipe(gulp.dest(path.join(path2Dist(p), '..')));
  });

  watcher.on('unlink', unlink);

  done();
}

exports.default = gulp.series(watchAssets, watchLess, watchTS, startMiniu);
