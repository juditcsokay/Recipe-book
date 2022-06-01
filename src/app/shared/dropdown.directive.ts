import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  isOpen = false;
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') mouseclick(eventData: Event) {
    if (this.isOpen) {
      this.renderer.removeClass(this.elRef.nativeElement, 'open');
      this.isOpen = false;
    } else {
      this.renderer.addClass(this.elRef.nativeElement, 'open');
      this.isOpen = true;
    }
  }

  //   @HostBinding("class.open") isOpen = false;
  //   @HostListener('click') toggleOpen() {
  //     this.isOpen = !this.isOpen;
  //   }
}
