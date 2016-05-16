gulp           = require 'gulp'
bower          = require 'gulp-bower'
clean          = require 'gulp-clean'
coffeeify      = require 'gulp-coffeeify'
concat         = require 'gulp-concat'
plumber        = require 'gulp-plumber'
uglify         = require 'gulp-uglify'
mainBowerFiles = require 'main-bower-files'

gulp.task 'bower', -> bower()

gulp.task 'build', ->
  gulp.src ['./index.coffee']
      .pipe plumber()
      .pipe coffeeify()
      .pipe concat('octoblu-device-schema-transmogrifier.js')
      .pipe gulp.dest('./dist/')

gulp.task 'build-deps', ['bower'], ->
  gulp.src mainBowerFiles({filter: /\.js$/})
      .pipe plumber()
      .pipe concat('dependencies.js')
      .pipe uglify()
      .pipe gulp.dest('./dist/')

gulp.task 'clean', ->
  gulp.src './dist/', read: false
      .pipe clean()

gulp.task 'default', ['build']
