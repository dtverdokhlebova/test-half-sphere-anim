import gulp from 'gulp'
import cached from 'gulp-cached'
import webp from 'gulp-webp'
import imagemin, { gifsicle, mozjpeg } from 'gulp-imagemin'
import pngquant from 'imagemin-pngquant'
import browsersync from 'browser-sync'
import gulpif from 'gulp-if'

function isConvertToWebp(file) {
  return file.extname === '.jpg' || file.extname === '.png'
}

export default function images() {
  return gulp.src('src/images/**/*.{gif,png,jpg,webp}')
    .pipe(cached('imagesCache'))
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({ quality: 75, progressive: true }),
      pngquant({ quality: [0.75, 0.75] })
    ]))
    .pipe(gulp.dest('build/img'))
    .pipe(gulpif(isConvertToWebp, webp()))
    .pipe(gulp.dest('build/img'))
    .on('end', browsersync.reload)
}
