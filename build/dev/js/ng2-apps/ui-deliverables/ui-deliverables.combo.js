var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("homepage.component", ['@angular/core', 'common/seo.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, seo_service_1;
    var HomepageComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (seo_service_1_1) {
                seo_service_1 = seo_service_1_1;
            }],
        execute: function() {
            HomepageComponent = (function () {
                function HomepageComponent(elementRef, seoService) {
                    this.elementRef = elementRef;
                    seoService.setTitle("UI Deliverables");
                    seoService.setMeta('description', "Welcome to the NEW UI Deliverable! I am working on this new UI Deliverables site developed with Laravel & Angular 2. It will eventually integrate the site with the new Bootstrap 4 framework (still under alpha). I'll probably wait until the final release before I implement it. I am use NPM as the package manager and GULP as the task runner. The site is developed using SASS and Typescript, that GULP compiles/transpiles to CSS and JavaScript/ES5.");
                    seoService.setMeta('keywords', 'Node, Gulp, JavaScript, Typescript, CSS,SASS, HTML, GIT');
                }
                HomepageComponent.prototype.ngOnInit = function () {
                    this.initClock();
                };
                HomepageComponent.prototype.initClock = function () {
                    var clockEl = this.elementRef.nativeElement.querySelector('#clock');
                    var hoursEl = clockEl.querySelector('.hours');
                    var minutesEl = clockEl.querySelector('.minutes');
                    var secondsEl = clockEl.querySelector('.seconds');
                    var date = new Date();
                    var hours = date.getHours();
                    var minutes = date.getMinutes();
                    var seconds = date.getSeconds();
                    var hoursAngle = (hours * 30) + (minutes / 2);
                    var minutesAngle = minutes * 6;
                    var secondsAngle = seconds * 6;
                    function transformEl(el, angle) {
                        el.style.transform = 'rotateZ(' + angle + 'deg)';
                    }
                    transformEl(hoursEl, hoursAngle);
                    transformEl(minutesEl, minutesAngle);
                    transformEl(secondsEl, secondsAngle);
                };
                HomepageComponent = __decorate([
                    core_1.Component({
                        selector: 'home-page',
                        templateUrl: window.MySite.templateSrc + 'homepage.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, (typeof (_a = typeof seo_service_1.SeoService !== 'undefined' && seo_service_1.SeoService) === 'function' && _a) || Object])
                ], HomepageComponent);
                return HomepageComponent;
                var _a;
            }());
            exports_1("HomepageComponent", HomepageComponent);
        }
    }
});
System.register("resume.component", ['@angular/core', 'common/seo.service'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, seo_service_2;
    var ResumeComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (seo_service_2_1) {
                seo_service_2 = seo_service_2_1;
            }],
        execute: function() {
            ResumeComponent = (function () {
                function ResumeComponent(elementRef, seoService) {
                    this.elementRef = elementRef;
                    seoService.setTitle("UI Deliverables: Raymond Lee's Resume - Front End Web Developer");
                    seoService.setMeta('description', 'Raymond Lee\'s resume. Front-End web developer. Experience with HTML/HTML5, CSS/CSS3, JavaScript, jQuery, AngularJS, Backbone.js,  Bootstrap, and JSON.');
                    seoService.setMeta('keywords', 'resume, html, html5, css, css3, javascript, jquery, ajax, json, frontend, front-end, developer, AngularJS, Backbone.js, Bootstrap');
                }
                ResumeComponent.prototype.ngOnInit = function () {
                };
                ResumeComponent = __decorate([
                    core_2.Component({
                        selector: 'resume-page',
                        templateUrl: window.MySite.templateSrc + 'resume.html'
                    }), 
                    __metadata('design:paramtypes', [core_2.ElementRef, (typeof (_a = typeof seo_service_2.SeoService !== 'undefined' && seo_service_2.SeoService) === 'function' && _a) || Object])
                ], ResumeComponent);
                return ResumeComponent;
                var _a;
            }());
            exports_2("ResumeComponent", ResumeComponent);
        }
    }
});
System.register("app-routing.module", ['@angular/core', '@angular/router', "homepage.component", "resume.component"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_3, router_1, homepage_component_1, resume_component_1;
    var routes, AppRoutingModule;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (homepage_component_1_1) {
                homepage_component_1 = homepage_component_1_1;
            },
            function (resume_component_1_1) {
                resume_component_1 = resume_component_1_1;
            }],
        execute: function() {
            routes = [
                { path: '', redirectTo: '/home', pathMatch: 'full' },
                { path: 'home', component: homepage_component_1.HomepageComponent },
                { path: 'resume', component: resume_component_1.ResumeComponent }
            ];
            AppRoutingModule = (function () {
                function AppRoutingModule() {
                }
                AppRoutingModule = __decorate([
                    core_3.NgModule({
                        imports: [router_1.RouterModule.forRoot(routes)],
                        exports: [router_1.RouterModule]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppRoutingModule);
                return AppRoutingModule;
            }());
            exports_3("AppRoutingModule", AppRoutingModule);
        }
    }
});
System.register("app.component", ['@angular/core'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_4;
    var AppComponent;
    return {
        setters:[
            function (core_4_1) {
                core_4 = core_4_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.copyrightYear = window.MySite.currentYear;
                }
                AppComponent = __decorate([
                    core_4.Component({
                        selector: 'ui-deliverables',
                        templateUrl: window.MySite.templateSrc + 'app-component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_4("AppComponent", AppComponent);
        }
    }
});
System.register("rxjs-extensions", ['rxjs/add/observable/of', 'rxjs/add/observable/throw', 'rxjs/add/operator/catch', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/do', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'rxjs/add/operator/switchMap'], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    return {
        setters:[
            function (_1) {},
            function (_2) {},
            function (_3) {},
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {},
            function (_8) {},
            function (_9) {}],
        execute: function() {
        }
    }
});
System.register("app.module", ['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', 'common/seo.service', "rxjs-extensions", "app-routing.module", "app.component", "homepage.component", "resume.component"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, platform_browser_1, forms_1, http_1, seo_service_3, app_routing_module_1, app_component_1, homepage_component_2, resume_component_2;
    var AppModule;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (seo_service_3_1) {
                seo_service_3 = seo_service_3_1;
            },
            function (_10) {},
            function (app_routing_module_1_1) {
                app_routing_module_1 = app_routing_module_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (homepage_component_2_1) {
                homepage_component_2 = homepage_component_2_1;
            },
            function (resume_component_2_1) {
                resume_component_2 = resume_component_2_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_5.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule,
                            http_1.HttpModule,
                            app_routing_module_1.AppRoutingModule
                        ],
                        declarations: [
                            homepage_component_2.HomepageComponent,
                            resume_component_2.ResumeComponent,
                            app_component_1.AppComponent
                        ],
                        providers: [seo_service_3.SeoService],
                        bootstrap: [app_component_1.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_6("AppModule", AppModule);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', '@angular/core', "app.module"], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var platform_browser_dynamic_1, core_6, app_module_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_6_1) {
                core_6 = core_6_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }],
        execute: function() {
            if (window.MySite.environment === "production") {
                core_6.enableProdMode();
            }
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    }
});
