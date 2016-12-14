var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("hello-world.component", ['@angular/core'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1;
    var HelloWorldComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            HelloWorldComponent = (function () {
                function HelloWorldComponent() {
                    // Declaring the variable for binding with initial value
                    this.user = {
                        yourName: ''
                    };
                }
                HelloWorldComponent = __decorate([
                    core_1.Component({
                        //moduleId: module.id,
                        // Declare the tag name in index.html to where the component attaches
                        selector: 'hello-world',
                        // Location of the template for this component
                        templateUrl: MySite.templateSrc + '/hello-world.html',
                        styleUrls: [MySite.stylesSrc + '/hello-world.css']
                    }), 
                    __metadata('design:paramtypes', [])
                ], HelloWorldComponent);
                return HelloWorldComponent;
            }());
            exports_1("HelloWorldComponent", HelloWorldComponent);
        }
    }
});
System.register("app.module", ['@angular/core', '@angular/platform-browser', '@angular/forms', "hello-world.component"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_2, platform_browser_1, forms_1, hello_world_component_1;
    var AppModule;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (hello_world_component_1_1) {
                hello_world_component_1 = hello_world_component_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_2.NgModule({
                        imports: [
                            platform_browser_1.BrowserModule,
                            forms_1.FormsModule
                        ],
                        declarations: [
                            hello_world_component_1.HelloWorldComponent
                        ],
                        bootstrap: [hello_world_component_1.HelloWorldComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_2("AppModule", AppModule);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', "app.module"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var platform_browser_dynamic_1, app_module_1;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (app_module_1_1) {
                app_module_1 = app_module_1_1;
            }],
        execute: function() {
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
        }
    }
});
