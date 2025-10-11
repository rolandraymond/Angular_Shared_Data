import { Component } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';
@Directive({
  selector: '[appHighlight]',
  standalone: false
})



// @Component({
//   selector: 'app-highlight',
//   standalone: false,
//   templateUrl: './highlight.html',
//   styleUrl: './highlight.css'
// })
export class Highlight {
  constructor(private el: ElementRef) { }
  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = '';
  }

}
