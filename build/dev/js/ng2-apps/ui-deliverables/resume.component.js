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
    var ResumeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (seo_service_1_1) {
                seo_service_1 = seo_service_1_1;
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
                    core_1.Component({
                        selector: 'resume-page',
                        templateUrl: window.MySite.templateSrc + 'resume.html'
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, (typeof (_a = typeof seo_service_1.SeoService !== 'undefined' && seo_service_1.SeoService) === 'function' && _a) || Object])
                ], ResumeComponent);
                return ResumeComponent;
                var _a;
            }());
            exports_1("ResumeComponent", ResumeComponent);
        }
    }
});
