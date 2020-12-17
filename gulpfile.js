const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const sourcemap = require(`gulp-sourcemaps`);
const sass = require(`gulp-sass`);
const postcss = require(`gulp-postcss`);
const autoprefixer = require(`autoprefixer`);
const server = require(`browser-sync`).create();
const csso = require(`gulp-csso`);
const rename = require(`gulp-rename`);
const imagemin = require(`gulp-imagemin`);
const webp = require(`gulp-webp`);
const svgstore = require(`gulp-svgstore`);
const del = require(`del`);
const uglify = require(`gulp-uglify`);
const webpackStream = require(`webpack-stream`);
const webpackConfig = require(`./webpack.config.js`);
const concat = require(`gulp-concat`);
const fileinclude = require(`gulp-file-include`);
const ghPages = require('gulp-gh-pages');
const stylelint = require('gulp-stylelint');
 
gulp.task('deploy', function() {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('test-scss', function() {
  return gulp.src(`source/**/*.scss`).
    pipe(stylelint({
      reporters: [
        {
          failAfterError: true,
          formatter: 'string',
          console: true,
        },
      ],
    }));
});

gulp.task('fix-scss', function fixCssTask() {
  const gulpStylelint = require('gulp-stylelint');
 
  return gulp
    .src(`source/**/*.scss`)
    .pipe(gulpStylelint({
      fix: true
    }))
    .pipe(gulp.dest(`source`));
});

gulp.task(`html`, function () {
  return gulp.src([`source/*.html`])
    .pipe(fileinclude({
      prefix: `@@`,
      basepath: `@root`,
      context: { // глобальные переменные для include
        test: `text`
      }
    }))
    .pipe(gulp.dest(`build`));
});

gulp.task(`css`, function () {
  return gulp.src(`source/sass/style.scss`)
      .pipe(plumber())
      .pipe(sourcemap.init())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        grid: true,
        overrideBrowserslist: ['ie >= 11, > 0.2%'],
      })]))
      .pipe(gulp.dest(`build/css`))
      .pipe(csso())
      .pipe(rename(`style.min.css`))
      .pipe(sourcemap.write(`.`))
      .pipe(gulp.dest(`build/css`))
      .pipe(server.stream());
});

gulp.task(`script`, function () {
  return gulp.src([`source/js/main.js`])
      .pipe(webpackStream(webpackConfig))
      .pipe(uglify())
      .pipe(gulp.dest(`build/js`));
});

gulp.task(`svgo`, function () {
  return gulp.src(`source/img/**/*.{svg}`)
      .pipe(imagemin([
        imagemin.svgo({
            plugins: [
              {removeViewBox: false},
              {removeRasterImages: true},
              {removeUselessStrokeAndFill: false},
            ]
          }),
      ]))
      .pipe(gulp.dest(`source/img`));
});

gulp.task(`sprite`, function () {
  return gulp.src(`source/img/sprite/*.svg`)
      .pipe(svgstore({inlineSvg: true}))
      .pipe(rename(`sprite_auto.svg`))
      .pipe(gulp.dest(`build/img`));
});

gulp.task(`server`, function () {
  server.init({
    server: `build/`,
    notify: false,
    open: true,
    cors: true,
    ui: false,
  });

  gulp.watch(`source/html/**/*.html`, gulp.series(`html`, `refresh`));
  gulp.watch("source/**/*.html", gulp.series("html", "refresh"));
  gulp.watch(`source/sass/**/*.{scss,sass}`, gulp.series(`css`));
  gulp.watch(`source/js/**/*.js`, gulp.series(`script`, `refresh`));
  gulp.watch(`source/img/**/*.svg`, gulp.series(`copysvg`, `sprite`, `html`, `refresh`));
  gulp.watch(`source/img/**/*.{png,jpg}`, gulp.series(`copypngjpg`, `html`, `refresh`));
});

gulp.task(`refresh`, function (done) {
  server.reload();
  done();
});

gulp.task(`copysvg`, function () {
  return gulp.src(`source/img/**/*.svg`, {base: `source`})
      .pipe(gulp.dest(`build`));
});

gulp.task(`copypngjpg`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`, {base: `source`})
      .pipe(gulp.dest(`build`));
});

gulp.task(`copy`, function () {
  return gulp.src([
    `source/fonts/**/*.{woff,woff2}`,
    `source/favicon/**`,
    `source/img/**`,
    `source/*.php`,
    `source/video/**`, // учтите, что иногда git искажает видеофайлы, pdf и gif - проверяйте и если обнаруживаете баги - скидывайте тестировщику такие файлы напрямую
    `source/downloads/**`,
  ], {
    base: `source`,
  })
      .pipe(gulp.dest(`build`));
});

gulp.task(`clean`, function () {
  return del(`build`);
});

gulp.task(`build`, gulp.series(
    `clean`,
    `svgo`,
    `copy`,
    `sprite`,
    `css`,
    `script`,
    `html`
));

gulp.task(`start`, gulp.series(`build`, `server`));

// Optional tasks
//---------------------------------
// Вызывайте через `npm run taskName`

gulp.task(`webp`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`)
      .pipe(webp({quality: 90}))
      .pipe(gulp.dest(`source/img`));
});

gulp.task(`imagemin`, function () {
  return gulp.src(`source/img/**/*.{png,jpg}`)
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
      ]))
      .pipe(gulp.dest(`source/img`));
});

// для отправки заказчику неминифицированного js "для чтения"
gulp.task(`concat-js`, function () {
  return gulp.src([`source/js/main.js`, `source/js/utils/**/*.js`, `source/js/modules/**/*.js`])
    .pipe(concat(`main.readonly.js`))
    .pipe(gulp.dest(`build/js`));
});
