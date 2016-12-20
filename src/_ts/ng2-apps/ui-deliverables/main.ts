import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import { AppModule } from './app.module';
if(window.MySite.environment==="production"){
	enableProdMode();
}
platformBrowserDynamic().bootstrapModule(AppModule);
