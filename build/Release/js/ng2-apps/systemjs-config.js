(function (MySite) {
    var isProduction = MySite.environment === "production" ? true : false;
    System.config({
        paths: {
            'npm:': isProduction ? '//unpkg.com/' : '/www2-static/node_modules/'
        },
        map: {
            // our app is within the app folder
            app: isProduction ? '/www2-static/build/Release/js/ng2-apps' : '/www2-static/build/dev/js/ng2-apps',
            common: isProduction ? '/www2-static/build/Release/js/ng2-apps/common' : '/www2-static/build/dev/js/ng2-apps/common',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js',
            // other libraries
            'rxjs': 'npm:rxjs',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
        },
        packages: {
            app: isProduction ? {} : {
                main: MySite.mainSrc,
                defaultExtension: 'js'
            },
            common: {
                defaultExtension: isProduction ? 'min.js' : 'js'
            },
            rxjs: {
                defaultExtension: 'js'
            }
        }
    }); // systemConfig
})(window.MySite);
