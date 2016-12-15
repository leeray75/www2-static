import { Component } from '@angular/core';
@Component({
  selector: 'ui-deliverables',
  templateUrl: window.MySite.templateSrc+'app-component.html'
})
export class AppComponent {
  copyrightYear = window.MySite.currentYear;
  constructor: void{
    console.log("constructor");
  }
}
