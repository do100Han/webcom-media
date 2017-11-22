var gulp        = require('gulp'), // Сообственно Gulp JS
    jade        = require('gulp-jade'),
    stylus      = require('gulp-stylus'), // Плагин для Stylus
    livereload  = require('gulp-livereload'), // Livereload для Gulp
    connect     = require('gulp-connect'),
    cleanCSS    = require('gulp-clean-css'), // Минификация CSS
    imagemin    = require('gulp-imagemin'), // Минификация изображений
    uglify      = require('gulp-uglify'), // Минификация JS
    rename      = require('gulp-rename'), // Измененени названий файлов
    concat      = require('gulp-concat'), // Склейка файлов
    autoprefix  = require('gulp-autoprefixer'), //Автоматическое добавление префиксов
    tynypng     = require('gulp-tinypng'), // Сжатие изображений 
    cache       = require('gulp-cache'), // Кэшируем img
    svgSprite   = require('gulp-svg-sprite'), // Спрайт SVG
    spritesmith = require('gulp.spritesmith'), // Спрайт PNG
    pngquant    = require('imagemin-pngquant'); // Дополнение к imagemin для работы с PNG

gulp.task('connect', function() {
  connect.server({
    root: 'app',
    livereload: true
  });
});

gulp.task('jade', function () {
  return gulp.src('app/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
    .pipe(connect.reload())
})

// Собираем Stylus в CSS + autoprefix 

gulp.task('stylus', function () {
    gulp.src('./app/css/style.styl')
    .pipe(stylus())
    .pipe(rename('style.css'))
    .pipe(autoprefix({
            browsers: ['last 20 versions'],
            cascade: false
        }))
    .pipe(gulp.dest('./app/css/'))
    .pipe(connect.reload())
});
 

// Спрайт PNG

gulp.task('sprite', function () {
        var spriteData = gulp.src('app/b-header/b-header/*.png').pipe(spritesmith({
            imgName: 'sprite_1.png',
            cssName: 'sprite_1.css',
            padding: 20
        }))
        spriteData.pipe(gulp.dest('app/b-header/b-header/sptites/'));
        
        var spriteData = gulp.src('app/b-main/b-main/*.png').pipe(spritesmith({
            imgName: 'sprite_2.png',
            cssName: 'sprite_2.css',
            padding: 20
        }))
        spriteData.pipe(gulp.dest('app/b-main/b-main/sptites/'));
        
        var spriteData = gulp.src('app/b-portfolio/b-portfolio/*.png').pipe(spritesmith({
            imgName: 'sprite_3.png',
            cssName: 'sprite_3.css',
            padding: 20
        }))
        spriteData.pipe(gulp.dest('app/b-portfolio/b-portfolio/sptites/'));
        
        var spriteData = gulp.src('app/b-reviews/b-reviews/*.png').pipe(spritesmith({
            imgName: 'sprite_5.png',
            cssName: 'sprite_5.css',
            padding: 20
        }))
        spriteData.pipe(gulp.dest('app/b-reviews/b-reviews/sptites/'));
        
        var spriteData = gulp.src('app/b-footer/b-footer/*.png').pipe(spritesmith({
            imgName: 'sprite_6.png',
            cssName: 'sprite_6.css',
            padding: 20
        }))
        spriteData.pipe(gulp.dest('app/b-footer/b-footer/sptites/'));
});

// Сжатие изображение по соответсвующим директориям

gulp.task('images', function() {
    gulp.src('./app/b-header/b-header/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]    
        })))
        .pipe(gulp.dest('./app/b-header/b-header/'))
    gulp.src('./app/b-main/b-main/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]    
        })))
        .pipe(gulp.dest('./app/b-main/b-main/'))
    gulp.src('./app/b-portfolio/b-portfolio/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]    
        })))
        .pipe(gulp.dest('./app/b-portfolio/b-portfolio/'))
    gulp.src('./app/b-advanteges/b-advanteges/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]    
        })))
        .pipe(gulp.dest('./app/b-advanteges/b-advanteges/'))
    gulp.src('./app/b-reviews/b-reviews/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]    
        })))
        .pipe(gulp.dest('./app/b-reviews/b-reviews/*'))
    gulp.src('./app/b-footer/b-footer/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins:[{removeViewBox: false}],
            use: [pngquant()]    
        })))
        .pipe(gulp.dest('./app/b-footer/b-footer/*'))
             
});

gulp.task('watch',function () {
    gulp.watch('app/**/*',['stylus'])
    gulp.watch('app/**/*',['jade'])
    });

gulp.task('default', ['connect','jade','stylus','watch']);


// СОБИРАЕМ ПРОЕКТ

gulp.task('build', function(){
    var buildCss = gulp.src(['app/css/*.css'])
    buildCss.pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src(['app/fonts/**/*'])
    buildFonts.pipe(gulp.dest('dist/fonts'));

    var libsJS = gulp.src(['app/libs/*.js'])
    libsJS.pipe(concat('libs.min.js'))
    .pipe(gulp.dest('dist/libs'));

    var mainJS = gulp.src(['app/js/main.js'])
    .pipe(gulp.dest('dist/js'))
    gulp.src(['app/js/main.js'])
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest('dist/js'));

    var buildhtml = gulp.src(['app/index.html'])
    .pipe(gulp.dest('dist/'));

});