import gulp from 'gulp'
import plumber from 'gulp-plumber'
import cached from 'gulp-cached'
import dependents from 'gulp-dependents'
import pugLinter from 'gulp-pug-linter'
import filter from 'gulp-filter'
import pug from 'gulp-pug'
import replace from 'gulp-replace';
import prettify from 'gulp-prettify';
import browsersync from 'browser-sync'

export default function pug2html() {
  return gulp.src('src/**/*.pug')
    .pipe(plumber())
    .pipe(cached('pugCache'))
    .pipe(dependents({
      '.pug': {
        parserSteps: [/^\s*(?:extends|include)\s+(.+?)\s*$/gm],
        postfixes: ['.pug', '.jade']
      }
    }))
    .pipe(pugLinter({ reporter: 'default' }))
    .pipe(filter('src/*.pug'))
    .pipe(pug({ pretty: true }))
    // .pipe(prettify({
    //   indent_size: 2,
    //   unformatted: ['code', 'pre', 'em', 'strong', 'span', 'a', 'button', 'svg'],
    //   content_unformatted: ['textarea', 'script']
    // }))
    .pipe(gulp.dest('build'))
    .on('end', browsersync.reload)
}
