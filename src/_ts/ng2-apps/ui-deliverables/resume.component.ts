import { Component, OnInit, ElementRef } from '@angular/core';
import { SeoService } from 'common/seo.service';
@Component({
  	selector: 'resume-page',
  	templateUrl: window.MySite.templateSrc+'resume.html'
})
export class ResumeComponent implements OnInit {
  constructor(private elementRef: ElementRef, seoService: SeoService) { 
    seoService.setTitle("UI Deliverables: Raymond Lee's Resume - Front End Web Developer");
    seoService.setMeta('description','Raymond Lee\'s resume. Front-End web developer. Experience with HTML/HTML5, CSS/CSS3, JavaScript, jQuery, AngularJS, Backbone.js,  Bootstrap, and JSON.');
    seoService.setMeta('keywords','resume, html, html5, css, css3, javascript, jquery, ajax, json, frontend, front-end, developer, AngularJS, Backbone.js, Bootstrap');
  }
  ngOnInit(): void {
  }
}