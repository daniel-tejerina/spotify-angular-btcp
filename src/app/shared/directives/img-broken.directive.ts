import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]',
  standalone: false
})
export class ImgBrokenDirective {
  @HostListener('error') handleError(): void {
    const elNativve = this.elHost.nativeElement;
    console.log("🛑 Esta imagen revento --> " , this.elHost);
    elNativve.src = 'img404.jpg';
  }
  constructor(private elHost: ElementRef) { }

}
