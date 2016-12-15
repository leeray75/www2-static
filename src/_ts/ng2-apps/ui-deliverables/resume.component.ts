import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  	selector: 'resume-page',
  	templateUrl: window.MySite.templateSrc+'resume.html'
})
export class ResumeComponent implements OnInit {
  constructor(private elementRef: ElementRef) { }
  ngOnInit(): void {
  }
}