import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  inject,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appCloseComponentIfClickedOutside]',
  standalone: true,
})
export class CloseComponentIfClickedOutsideDirective {
  private readonly elRef: ElementRef = inject(ElementRef);

  element: HTMLElement = this.elRef.nativeElement;

  @Output() clickOutside = new EventEmitter<void>();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: HTMLElement): void {
    const isClickedInside = this.element.contains(targetElement);

    if (!isClickedInside) {
      this.clickOutside.emit();
    }
  }
}
