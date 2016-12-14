var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("hero", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Hero;
    return {
        setters:[],
        execute: function() {
            Hero = (function () {
                function Hero() {
                }
                return Hero;
            }());
            exports_1("Hero", Hero);
        }
    }
});
System.register("hero.service", ['@angular/core', '@angular/http', 'rxjs/add/operator/toPromise'], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var core_1, http_1;
    var HeroService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {}],
        execute: function() {
            HeroService = (function () {
                function HeroService(http) {
                    this.http = http;
                    this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
                    this.heroesUrl = 'app/heroes'; // URL to web api
                }
                HeroService.prototype.handleError = function (error) {
                    console.error('An error occurred', error); // for demo purposes only
                    return Promise.reject(error.message || error);
                };
                HeroService.prototype.getHeroes = function () {
                    return this.http.get(this.heroesUrl)
                        .toPromise()
                        .then(function (response) { return response.json().data; })
                        .catch(this.handleError);
                };
                HeroService.prototype.getHero = function (id) {
                    return this.getHeroes()
                        .then(function (heroes) { return heroes.find(function (hero) { return hero.id === id; }); });
                };
                HeroService.prototype.update = function (hero) {
                    var url = this.heroesUrl + "/" + hero.id;
                    return this.http
                        .put(url, JSON.stringify(hero), { headers: this.headers })
                        .toPromise()
                        .then(function () { return hero; })
                        .catch(this.handleError);
                };
                HeroService.prototype.create = function (name) {
                    return this.http
                        .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
                        .toPromise()
                        .then(function (res) { return res.json().data; })
                        .catch(this.handleError);
                };
                HeroService.prototype.delete = function (id) {
                    var url = this.heroesUrl + "/" + id;
                    return this.http.delete(url, { headers: this.headers })
                        .toPromise()
                        .then(function () { return null; })
                        .catch(this.handleError);
                };
                HeroService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], HeroService);
                return HeroService;
            }());
            exports_2("HeroService", HeroService);
        }
    }
});
System.register("dashboard.component", ['@angular/core', "hero.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_2, hero_service_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (hero_service_1_1) {
                hero_service_1 = hero_service_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(heroService) {
                    this.heroService = heroService;
                    this.heroes = [];
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.heroService.getHeroes()
                        .then(function (heroes) { return _this.heroes = heroes.slice(1, 5); });
                };
                DashboardComponent = __decorate([
                    core_2.Component({
                        //moduleId: module.id,
                        selector: 'my-dashboard',
                        templateUrl: window.MySite.templateSrc + 'dashboard.component.html'
                    }), 
                    __metadata('design:paramtypes', [hero_service_1.HeroService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_3("DashboardComponent", DashboardComponent);
        }
    }
});
System.register("heroes.component", ['@angular/core', '@angular/router', "hero.service"], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_3, router_1, hero_service_2;
    var HeroesComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (hero_service_2_1) {
                hero_service_2 = hero_service_2_1;
            }],
        execute: function() {
            HeroesComponent = (function () {
                function HeroesComponent(heroService, router) {
                    this.heroService = heroService;
                    this.router = router;
                }
                HeroesComponent.prototype.ngOnInit = function () {
                    this.getHeroes();
                };
                HeroesComponent.prototype.getHeroes = function () {
                    var _this = this;
                    this.heroService.getHeroes().then(function (heroes) {
                        _this.heroes = heroes;
                    });
                };
                HeroesComponent.prototype.gotoDetail = function () {
                    this.router.navigate(['/detail', this.selectedHero.id]);
                };
                HeroesComponent.prototype.onSelect = function (hero) {
                    this.selectedHero = hero;
                };
                HeroesComponent.prototype.add = function (name) {
                    var _this = this;
                    name = name.trim();
                    if (!name) {
                        return;
                    }
                    this.heroService.create(name)
                        .then(function (hero) {
                        _this.heroes.push(hero);
                        _this.selectedHero = null;
                    });
                };
                HeroesComponent.prototype.delete = function (hero) {
                    var _this = this;
                    this.heroService
                        .delete(hero.id)
                        .then(function () {
                        _this.heroes = _this.heroes.filter(function (h) { return h !== hero; });
                        if (_this.selectedHero === hero) {
                            _this.selectedHero = null;
                        }
                    });
                };
                HeroesComponent = __decorate([
                    core_3.Component({
                        //moduleId: module.id,
                        selector: 'my-heroes',
                        templateUrl: window.MySite.templateSrc + 'heroes.component.html'
                    }), 
                    __metadata('design:paramtypes', [hero_service_2.HeroService, router_1.Router])
                ], HeroesComponent);
                return HeroesComponent;
            }());
            exports_4("HeroesComponent", HeroesComponent);
        }
    }
});
System.register("hero-detail.component", ['rxjs/add/operator/map', 'rxjs/add/operator/switchMap', '@angular/core', '@angular/router', '@angular/common', "hero.service", "hero"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_4, router_2, common_1, hero_service_3, hero_1;
    var HeroDetailComponent;
    return {
        setters:[
            function (_2) {},
            function (_3) {},
            function (core_4_1) {
                core_4 = core_4_1;
            },
            function (router_2_1) {
                router_2 = router_2_1;
            },
            function (common_1_1) {
                common_1 = common_1_1;
            },
            function (hero_service_3_1) {
                hero_service_3 = hero_service_3_1;
            },
            function (hero_1_1) {
                hero_1 = hero_1_1;
            }],
        execute: function() {
            HeroDetailComponent = (function () {
                function HeroDetailComponent(heroService, route, location) {
                    this.heroService = heroService;
                    this.route = route;
                    this.location = location;
                }
                HeroDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.route.params
                        .switchMap(function (params) { return _this.heroService.getHero(+params['id']); })
                        .subscribe(function (hero) { return _this.hero = hero; });
                };
                HeroDetailComponent.prototype.goBack = function () {
                    this.location.back();
                };
                HeroDetailComponent.prototype.save = function () {
                    var _this = this;
                    this.heroService.update(this.hero)
                        .then(function () { return _this.goBack(); });
                };
                __decorate([
                    core_4.Input(), 
                    __metadata('design:type', hero_1.Hero)
                ], HeroDetailComponent.prototype, "hero", void 0);
                HeroDetailComponent = __decorate([
                    core_4.Component({
                        //moduleId: module.id,
                        selector: 'my-hero-detail',
                        templateUrl: window.MySite.templateSrc + 'hero-detail.component.html'
                    }), 
                    __metadata('design:paramtypes', [hero_service_3.HeroService, router_2.ActivatedRoute, common_1.Location])
                ], HeroDetailComponent);
                return HeroDetailComponent;
            }());
            exports_5("HeroDetailComponent", HeroDetailComponent);
        }
    }
});
System.register("app-routing.module", ['@angular/core', '@angular/router', "dashboard.component", "heroes.component", "hero-detail.component"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var core_5, router_3, dashboard_component_1, heroes_component_1, hero_detail_component_1;
    var routes, AppRoutingModule;
    return {
        setters:[
            function (core_5_1) {
                core_5 = core_5_1;
            },
            function (router_3_1) {
                router_3 = router_3_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (heroes_component_1_1) {
                heroes_component_1 = heroes_component_1_1;
            },
            function (hero_detail_component_1_1) {
                hero_detail_component_1 = hero_detail_component_1_1;
            }],
        execute: function() {
            routes = [
                { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
                { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
                { path: 'detail/:id', component: hero_detail_component_1.HeroDetailComponent },
                { path: 'heroes', component: heroes_component_1.HeroesComponent }
            ];
            AppRoutingModule = (function () {
                function AppRoutingModule() {
                }
                AppRoutingModule = __decorate([
                    core_5.NgModule({
                        imports: [router_3.RouterModule.forRoot(routes)],
                        exports: [router_3.RouterModule]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppRoutingModule);
                return AppRoutingModule;
            }());
            exports_6("AppRoutingModule", AppRoutingModule);
        }
    }
});
System.register("app.component", ['@angular/core'], function(exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    var core_6;
    var AppComponent;
    return {
        setters:[
            function (core_6_1) {
                core_6 = core_6_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Tour of Heroes';
                }
                AppComponent = __decorate([
                    core_6.Component({
                        //moduleId: module.id,
                        selector: 'my-app',
                        template: "\n    <h1>{{title}}</h1>\n    <nav>\n      <a routerLink=\"/heroes\" routerLinkActive=\"active\">Heroes</a>\n      <a routerLink=\"/dashboard\" routerLinkActive=\"active\">Dashboard</a>\n    </nav>\n    <router-outlet></router-outlet>\n  "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_7("AppComponent", AppComponent);
        }
    }
});
System.register("app.component.spec", ["app.component", '@angular/core/testing', '@angular/platform-browser'], function(exports_8, context_8) {
    "use strict";
    var __moduleName = context_8 && context_8.id;
    var app_component_1, testing_1, platform_browser_1;
    return {
        setters:[
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            }],
        execute: function() {
            describe('AppComponent', function () {
                var de;
                var comp;
                var fixture;
                beforeEach(testing_1.async(function () {
                    testing_1.TestBed.configureTestingModule({
                        declarations: [app_component_1.AppComponent]
                    })
                        .compileComponents();
                }));
                beforeEach(function () {
                    fixture = testing_1.TestBed.createComponent(app_component_1.AppComponent);
                    comp = fixture.componentInstance;
                    de = fixture.debugElement.query(platform_browser_1.By.css('h1'));
                });
                it('should create component', function () { return expect(comp).toBeDefined(); });
                it('should have expected <h1> text', function () {
                    fixture.detectChanges();
                    var h1 = de.nativeElement;
                    expect(h1.innerText).toMatch(/angular/i, '<h1> should say something about "Angular"');
                });
            });
        }
    }
});
System.register("in-memory-data.service", [], function(exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    var InMemoryDataService;
    return {
        setters:[],
        execute: function() {
            InMemoryDataService = (function () {
                function InMemoryDataService() {
                }
                InMemoryDataService.prototype.createDb = function () {
                    var heroes = [
                        { id: 11, name: 'Mr. Nice' },
                        { id: 12, name: 'Narco' },
                        { id: 13, name: 'Bombasto' },
                        { id: 14, name: 'Celeritas' },
                        { id: 15, name: 'Magneta' },
                        { id: 16, name: 'RubberMan' },
                        { id: 17, name: 'Dynama' },
                        { id: 18, name: 'Dr IQ' },
                        { id: 19, name: 'Magma' },
                        { id: 20, name: 'Tornado' }
                    ];
                    return { heroes: heroes };
                };
                return InMemoryDataService;
            }());
            exports_9("InMemoryDataService", InMemoryDataService);
        }
    }
});
System.register("rxjs-extensions", ['rxjs/add/observable/of', 'rxjs/add/observable/throw', 'rxjs/add/operator/catch', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/distinctUntilChanged', 'rxjs/add/operator/do', 'rxjs/add/operator/filter', 'rxjs/add/operator/map', 'rxjs/add/operator/switchMap'], function(exports_10, context_10) {
    "use strict";
    var __moduleName = context_10 && context_10.id;
    return {
        setters:[
            function (_4) {},
            function (_5) {},
            function (_6) {},
            function (_7) {},
            function (_8) {},
            function (_9) {},
            function (_10) {},
            function (_11) {},
            function (_12) {}],
        execute: function() {
        }
    }
});
System.register("hero-search.service", ['@angular/core', '@angular/http'], function(exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    var core_7, http_2;
    var HeroSearchService;
    return {
        setters:[
            function (core_7_1) {
                core_7 = core_7_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            }],
        execute: function() {
            HeroSearchService = (function () {
                function HeroSearchService(http) {
                    this.http = http;
                }
                HeroSearchService.prototype.search = function (term) {
                    return this.http
                        .get("app/heroes/?name=" + term)
                        .map(function (r) { return r.json().data; });
                };
                HeroSearchService = __decorate([
                    core_7.Injectable(), 
                    __metadata('design:paramtypes', [http_2.Http])
                ], HeroSearchService);
                return HeroSearchService;
            }());
            exports_11("HeroSearchService", HeroSearchService);
        }
    }
});
System.register("hero-search.component", ['@angular/core', '@angular/router', 'rxjs/Observable', 'rxjs/Subject', "hero-search.service"], function(exports_12, context_12) {
    "use strict";
    var __moduleName = context_12 && context_12.id;
    var core_8, router_4, Observable_1, Subject_1, hero_search_service_1;
    var HeroSearchComponent;
    return {
        setters:[
            function (core_8_1) {
                core_8 = core_8_1;
            },
            function (router_4_1) {
                router_4 = router_4_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            },
            function (hero_search_service_1_1) {
                hero_search_service_1 = hero_search_service_1_1;
            }],
        execute: function() {
            HeroSearchComponent = (function () {
                function HeroSearchComponent(heroSearchService, router) {
                    this.heroSearchService = heroSearchService;
                    this.router = router;
                    this.searchTerms = new Subject_1.Subject();
                }
                // Push a search term into the observable stream.
                HeroSearchComponent.prototype.search = function (term) {
                    this.searchTerms.next(term);
                };
                HeroSearchComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this.heroes = this.searchTerms
                        .debounceTime(300) // wait for 300ms pause in events
                        .distinctUntilChanged() // ignore if next search term is same as previous
                        .switchMap(function (term) { return term // switch to new observable each time
                        ? _this.heroSearchService.search(term)
                        : Observable_1.Observable.of([]); })
                        .catch(function (error) {
                        // TODO: real error handling
                        console.log(error);
                        return Observable_1.Observable.of([]);
                    });
                };
                HeroSearchComponent.prototype.gotoDetail = function (hero) {
                    var link = ['/detail', hero.id];
                    this.router.navigate(link);
                };
                HeroSearchComponent = __decorate([
                    core_8.Component({
                        //moduleId: module.id,
                        selector: 'hero-search',
                        templateUrl: window.MySite.templateSrc + 'hero-search.component.html',
                        //styleUrls: [ window.MySite.stylesSrc+'hero-search.component.css' ],
                        providers: [hero_search_service_1.HeroSearchService]
                    }), 
                    __metadata('design:paramtypes', [hero_search_service_1.HeroSearchService, router_4.Router])
                ], HeroSearchComponent);
                return HeroSearchComponent;
            }());
            exports_12("HeroSearchComponent", HeroSearchComponent);
        }
    }
});
System.register("app.module", ['@angular/core', '@angular/platform-browser', '@angular/forms', '@angular/http', 'angular-in-memory-web-api', "in-memory-data.service", "rxjs-extensions", "app.component", "dashboard.component", "hero-detail.component", "heroes.component", "hero.service", "app-routing.module", "hero-search.component"], function(exports_13, context_13) {
    "use strict";
    var __moduleName = context_13 && context_13.id;
    var core_9, platform_browser_2, forms_1, http_3, angular_in_memory_web_api_1, in_memory_data_service_1, app_component_2, dashboard_component_2, hero_detail_component_2, heroes_component_2, hero_service_4, app_routing_module_1, hero_search_component_1;
    var AppModule;
    return {
        setters:[
            function (core_9_1) {
                core_9 = core_9_1;
            },
            function (platform_browser_2_1) {
                platform_browser_2 = platform_browser_2_1;
            },
            function (forms_1_1) {
                forms_1 = forms_1_1;
            },
            function (http_3_1) {
                http_3 = http_3_1;
            },
            function (angular_in_memory_web_api_1_1) {
                angular_in_memory_web_api_1 = angular_in_memory_web_api_1_1;
            },
            function (in_memory_data_service_1_1) {
                in_memory_data_service_1 = in_memory_data_service_1_1;
            },
            function (_13) {},
            function (app_component_2_1) {
                app_component_2 = app_component_2_1;
            },
            function (dashboard_component_2_1) {
                dashboard_component_2 = dashboard_component_2_1;
            },
            function (hero_detail_component_2_1) {
                hero_detail_component_2 = hero_detail_component_2_1;
            },
            function (heroes_component_2_1) {
                heroes_component_2 = heroes_component_2_1;
            },
            function (hero_service_4_1) {
                hero_service_4 = hero_service_4_1;
            },
            function (app_routing_module_1_1) {
                app_routing_module_1 = app_routing_module_1_1;
            },
            function (hero_search_component_1_1) {
                hero_search_component_1 = hero_search_component_1_1;
            }],
        execute: function() {
            AppModule = (function () {
                function AppModule() {
                }
                AppModule = __decorate([
                    core_9.NgModule({
                        imports: [
                            platform_browser_2.BrowserModule,
                            forms_1.FormsModule,
                            http_3.HttpModule,
                            angular_in_memory_web_api_1.InMemoryWebApiModule.forRoot(in_memory_data_service_1.InMemoryDataService),
                            app_routing_module_1.AppRoutingModule
                        ],
                        declarations: [
                            app_component_2.AppComponent,
                            dashboard_component_2.DashboardComponent,
                            hero_detail_component_2.HeroDetailComponent,
                            heroes_component_2.HeroesComponent,
                            hero_search_component_1.HeroSearchComponent
                        ],
                        providers: [hero_service_4.HeroService],
                        bootstrap: [app_component_2.AppComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppModule);
                return AppModule;
            }());
            exports_13("AppModule", AppModule);
        }
    }
});
System.register("main", ['@angular/platform-browser-dynamic', "app.module"], function(exports_14, context_14) {
    "use strict";
    var __moduleName = context_14 && context_14.id;
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
System.register("mock-heroes", [], function(exports_15, context_15) {
    "use strict";
    var __moduleName = context_15 && context_15.id;
    var HEROES;
    return {
        setters:[],
        execute: function() {
            exports_15("HEROES", HEROES = [
                { id: 11, name: 'Mr. Nice' },
                { id: 12, name: 'Narco' },
                { id: 13, name: 'Bombasto' },
                { id: 14, name: 'Celeritas' },
                { id: 15, name: 'Magneta' },
                { id: 16, name: 'RubberMan' },
                { id: 17, name: 'Dynama' },
                { id: 18, name: 'Dr IQ' },
                { id: 19, name: 'Magma' },
                { id: 20, name: 'Tornado' }
            ]);
        }
    }
});
