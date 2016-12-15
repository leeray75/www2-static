import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  	selector: 'home-page',
  	templateUrl: window.MySite.templateSrc+'homepage.html'
})
export class HomepageComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }
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