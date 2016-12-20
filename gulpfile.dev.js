var git = require('git-rev')
var gulp = require('gulp');
var gulpif = require('gulp-if');
var map  = require('map-stream');
var sass = require('gulp-sass');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var rename = require("gulp-rename");
var debug = require('gulp-debug');
var rimraf = require('gulp-rimraf');
var minify = require('gulp-minify');
var nano = require('gulp-cssnano');
var replace = require('gulp-replace');

var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');


var htmlmin = require('gulp-html-minifier');
var _scssFiles = 'src/_scss/**/*.scss';
var _tsFiles = 'src/_ts/**/*.ts';

var tsProject = ts.createProject('tsconfig.json');

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
var renameMinJsFile = function(path){
	if(path.basename.endsWith("-min")){			
		path.basename = path.basename.replace(/-min([^-min]*)$/,'$1');
		path.extname = ".min.js";
	}		
}

function getFolders(dir) {
	return fs.readdirSync(dir)
	  .filter(function(file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	  });
}
	
gulp.task('sass', function() {
    return gulp.src(_scssFiles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/dev/css'));
});

gulp.task('typescript', function() {
	console.log("task: typescript");
	var scriptsPath = './src/_ts/ng2-apps';
	var folders = getFolders(scriptsPath);
	
	var tasks = folders.map(function(folder) {
		var tsProject = ts.createProject('tsconfig.json',{
			outFile: folder+".combo.js"
		});
		var src = path.join(scriptsPath, folder, '/**/*.ts');
		  return gulp.src(src)
			.pipe(tsProject())
			.pipe(gulp.dest('build/dev/js/ng2-apps/'+folder));    
	});
	
	tsProject = ts.createProject('tsconfig.json');
    var tsTask = gulp.src(_tsFiles )
        .pipe(tsProject())
        .pipe(gulp.dest('build/dev/js'));
	
	return merge(tasks, tsTask);

});



//Watch task
gulp.task('watch', function() {
	console.log("watching _scss and _ts files");
    watch(_scssFiles, function () {
        gulp.start("sass");
    });	
	watch(_tsFiles, function () {		 
        gulp.start("typescript");
    });	

	watch('src/templates/**/*',function(){
		gulp.start('copy-templates');
	})
});



gulp.task('clean-dev', function(cb) {
	return gulp.src('./build/dev/*', { read: false }) // much faster
	  .pipe(rimraf());
});


gulp.task('copy-fonts', function(cb) {
	console.log("copy fonts");
  return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./build/dev/fonts'))
 
});

gulp.task('copy-templates', function(cb) {
	console.log("copy templates");
  return gulp.src('./src/templates/**/*')
	.pipe(gulp.dest('./build/dev/templates'))
});


gulp.task('init',['sass', 'typescript', 'copy-templates','copy-fonts','watch'],function(){});


gulp.task('default', ['clean-dev'],function(){
	console.log("triggering new tasks");
	gulp.start('init');
});
