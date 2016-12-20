import { Component, OnInit, ElementRef } from '@angular/core';
import { SeoService } from 'common/seo.service';
@Component({
  	selector: 'home-page',
  	templateUrl: window.MySite.templateSrc+'homepage.html'
})
export class HomepageComponent implements OnInit {

  constructor(private elementRef: ElementRef, seoService: SeoService) { 
    seoService.setTitle("UI Deliverables");
    seoService.setMeta('description',`Welcome to the NEW UI Deliverable! I am working on this new UI Deliverables site developed with Laravel & Angular 2. It will eventually integrate the site with the new Bootstrap 4 framework (still under alpha). I'll probably wait until the final release before I implement it. I am use NPM as the package manager and GULP as the task runner. The site is developed using SASS and Typescript, that GULP compiles/transpiles to CSS and JavaScript/ES5.`);
    seoService.setMeta('keywords','Node, Gulp, JavaScript, Typescript, CSS,SASS, HTML, GIT');
  }
  ngOnInit(): void {
    this.initClock();
  }

  initClock(): void{
    let clockEl = this.elementRef.nativeElement.querySelector('#clock');
    let hoursEl = clockEl.querySelector('.hours');
    let minutesEl = clockEl.querySelector('.minutes');
    let secondsEl = clockEl.querySelector('.seconds');

    let date = new Date();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    
    let hoursAngle = (hours * 30) + (minutes / 2);
    let minutesAngle = minutes*6;
    let secondsAngle = seconds*6;

    function transformEl(el,angle){
      el.style.transform = 'rotateZ('+angle+'deg)';
    }
    transformEl(hoursEl,hoursAngle);
    transformEl(minutesEl,minutesAngle);
    transformEl(secondsEl,secondsAngle);

  }
}