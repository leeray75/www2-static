System.register(['@angular/core', 'common/seo.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
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
