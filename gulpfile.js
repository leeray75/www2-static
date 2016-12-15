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
		console.log("TEST: "+src);
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


(function(){
	var jsFiles = './build/dev/js/**/*', 
    jsDest = './build/Release/js';
	


	gulp.task('minify-js', function(cb) {
		console.log("minify-js");
	  return gulp.src('./build/dev/js/**/*.js')
		.pipe(debug())
		.pipe(minify({
			/* exclude: ['tasks'], */
			ignoreFiles: ['.min.js','-min.js']
		}))
		.pipe(rename(renameMinJsFile))
		.pipe(debug())
		.pipe(gulp.dest('./build/Release/js'));
	});
	

	
	gulp.task('concat-scripts', function() {
	   var scriptsPath = './build/Release/js/ng2-apps';
	   var folders = getFolders(scriptsPath);
	
	   var tasks = folders.map(function(folder) {
		  return gulp.src(path.join(scriptsPath, folder, '/**/*.js'))
			// concat into foldername.js
			.pipe(concat(folder + '.combo.js'))
			// write to output
			.pipe(gulp.dest(scriptsPath)) 
			// minify
			.pipe(uglify())    
			// rename to folder.min.js
			.pipe(rename(folder + '.combo.min.js')) 
			// write to output again
			.pipe(gulp.dest(scriptsPath));    
	   });
	
	   // process all remaining files in scriptsPath root into main.js and main.min.js files
	   var root = gulp.src(path.join(scriptsPath, '/*.js'))
			.pipe(concat('main.js'))
			.pipe(gulp.dest(scriptsPath))
			.pipe(uglify())
			.pipe(rename('main.min.js'))
			.pipe(gulp.dest(scriptsPath));
	
	   return merge(tasks, root);
	});
	
})();

gulp.task('clean-css', function(cb) {
	return gulp.src('./src/css', { read: false }) // much faster
	  .pipe(rimraf());
});
gulp.task('clean-js', function(cb) {
	return gulp.src('./src/js', { read: false }) // much faster
	  .pipe(rimraf());
});
gulp.task('clean-build', function(cb) {
	return gulp.src('./build/*', { read: false }) // much faster
	  .pipe(rimraf());
});
/*
gulp.task('clean',['clean-css','clean-js','clean-build'],function(){	
});
*/
gulp.task('clean',['clean-build'],function(){	
});
gulp.task('minify-css', function(cb) {
    return gulp.src('./build/dev/css/**/*.css')
        .pipe(nano())
        .pipe(gulp.dest('./build/Release/css'));
});


gulp.task('copy-fonts', function(cb) {
	console.log("copy fonts");
  return gulp.src('./src/fonts/**/*')
	.pipe(gulp.dest('./build/dev/fonts'))
    .pipe(gulp.dest('./build/Release/fonts'));
});

gulp.task('copy-templates', function(cb) {
	console.log("copy templates");
  return gulp.src('./src/templates/**/*')
	.pipe(gulp.dest('./build/dev/templates'))
    .pipe(gulp.dest('./build/Release/templates'));
});

gulp.task('copy-js', function(cb) {
	console.log("copy javascripts");
  return gulp.src('./src/js/**/*')
	.pipe(gulp.dest('./build/dev/js'))
    .pipe(gulp.dest('./build/Release/js'));
});
gulp.task('copy-css', function(cb) {
	console.log("copy css");
  return gulp.src('./src/css/**/*')
	.pipe(gulp.dest('./build/dev/css'))
    .pipe(gulp.dest('./build/Release/css'));
});

function doWatch(){
    watch('./build/dev/js/**/*.js', function(cb){
		
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var scriptsPath = file.substring(0, file.lastIndexOf("/"));
		var dest = scriptsPath.replace("./build/dev","./build/Release");	
		
		gulp.src(file)		
		.pipe(minify({
			/* exclude: ['tasks'], */
			ignoreFiles: ['.combo.js','.min.js','-min.js']
		}))
		.pipe(rename(renameMinJsFile))
		.pipe(gulp.dest(dest));
	});
	/* 
    watch(['./build/dev/js/ng2-apps/**//*.js','!./build/dev/js/ng2-apps/**//*.combo.js'], function(cb){
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var scriptsPath = file.substring(0, file.lastIndexOf("/"));
		var dest = scriptsPath.replace("./build/dev","./build/Release");	
		var pathsArray = scriptsPath.split("/");
		var folderName = pathsArray[pathsArray.length-1];
		console.log("scriptsPath:",scriptsPath);
		console.log("folderName:",folderName);
		
		gulp.src([scriptsPath+'/**//*.js','!'+scriptsPath+'/**//*.combo.js'])
        .pipe(concat(folderName + '.combo.js'))
		.pipe(debug())
        .pipe(gulp.dest(scriptsPath));
	});	
	*/

    watch('./build/dev/css/**/*.css', function(cb){
		console.log("watch css");
		var file = "."+arguments[0].path.replace(arguments[0].cwd,'').replace(/\\/g, "/");
		var filePath = file.substring(0, file.lastIndexOf("/"));
		var dest = filePath.replace("./build/dev","./build/Release");
		gulp.src(file)
		.pipe(debug())
		.pipe(nano())
		.pipe(gulp.dest(dest));
	});


	
}
gulp.task('build',['minify-css','minify-js','copy-fonts','copy-templates'],function(){
	console.log("finished build, doing watch");
	git.long(function(str){
		console.log("GIT: "+str);
		gulp.src(['./src/CacheBuster.php'])
		.pipe(replace("$cacheVersion = '';","$cacheVersion = '"+str+"';"))
		.pipe(gulp.dest('./build'));
	})
	
	//gulp.start('concat-scripts');
	doWatch();
});

gulp.task('init',['sass', 'typescript', 'watch'],function(){
	gulp.start('build');	
});


gulp.task('default', ['clean'],function(){
	console.log("triggering new tasks");
	gulp.start('init');
});
