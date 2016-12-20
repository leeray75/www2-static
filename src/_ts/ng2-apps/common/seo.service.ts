import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable()
export class SeoService {
 /**
  * Angular 2 Title Service
  */
  private titleService: Title;
 /**
  * <head> Element of the HTML document
  */
  private headElement: HTMLElement;
  private metas: any;

 /**
  * Inject the Angular 2 Title Service
  * @param titleService
  */
  constructor(titleService: Title){
    this.titleService = titleService;
    this.metas = {};
    this.headElement = document.querySelector('head');
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public getMeta(name: string): HTMLElement{
    return this.getOrCreateMetaElement(name);
  }
  public setMeta(name: string, value: string): void{
    this.getOrCreateMetaElement(name).setAttribute('content',value);
  }

   /**
    * get the HTML Element when it is in the markup, or create it.
    * @param name
    * @returns {HTMLElement}
    */
    private getOrCreateMetaElement(name: string): HTMLElement {
      let el: HTMLElement;
      if(this.metas[name]){
        return this.metas[name];
      }

      el = <HTMLElement> document.querySelector('meta[name=' + name + ']');

      if (el === null) {
        el = document.createElement('meta');
        el.setAttribute('name', name);
        this.headElement.appendChild(el);
      }
      this.metas[name]=el;
      return el;
    }

}