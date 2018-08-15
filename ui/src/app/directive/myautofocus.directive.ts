import { Directive, OnInit, ElementRef, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[myAutofocus]'
})
export class AutofocusDirective implements AfterViewInit  {
  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  constructor(private elementRef: ElementRef) { };

  OnAfterViewInit (): void {
    
    this.elementRef.nativeElement.focus();
  }

}