var gulp = require('gulp');
var rimraf  = require('rimraf');

gulp.task('dist', function(done) {

    //remove old dist files from laravel public folder
    rimraf.sync('./../backend/public/app');

    //copy dist folder into laravel public folder
    gulp.src(['./dist/app/**/*', '!./dist/stats.json']).pipe(gulp.dest('./../backend/public/app'));
    
    done();
});
