System.register(['@angular/core', '@angular/platform-browser'], function(exports_1, context_1) {
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
    var core_1, platform_browser_1;
    var SeoService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }],
        execute: function() {
            SeoService = (function () {
                /**
                 * Inject the Angular 2 Title Service
                 * @param titleService
                 */
                function SeoService(titleService) {
                    this.titleService = titleService;
                    this.metas = {};
                    this.headElement = document.querySelector('head');
                }
                SeoService.prototype.getTitle = function () {
                    return this.titleService.getTitle();
                };
                SeoService.prototype.setTitle = function (newTitle) {
                    this.titleService.setTitle(newTitle);
                };
                SeoService.prototype.getMeta = function (name) {
                    return this.getOrCreateMetaElement(name);
                };
                SeoService.prototype.setMeta = function (name, value) {
                    this.getOrCreateMetaElement(name).setAttribute('content', value);
                };
                /**
                 * get the HTML Element when it is in the markup, or create it.
                 * @param name
                 * @returns {HTMLElement}
                 */
                SeoService.prototype.getOrCreateMetaElement = function (name) {
                    var el;
                    if (this.metas[name]) {
                        return this.metas[name];
                    }
                    el = document.querySelector('meta[name=' + name + ']');
                    if (el === null) {
                        el = document.createElement('meta');
                        el.setAttribute('name', name);
                        this.headElement.appendChild(el);
                    }
                    this.metas[name] = el;
                    return el;
                };
                SeoService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [platform_browser_1.Title])
                ], SeoService);
                return SeoService;
            }());
            exports_1("SeoService", SeoService);
        }
    }
});
