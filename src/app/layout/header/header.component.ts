import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public innerWidth         : any;
  public availableClasses   : string[] = ['on', 'off'];
  public numberBody         : number;
  public currentClassIdx    : number;
  public bodyClass          : string;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
    .observe(['(max-width: 1024px)'])
    .subscribe((result: BreakpointState) => {
      if (result.matches) {
        this.currentClassIdx = 1;
      } else {
        this.currentClassIdx = 0;
      }
      });

      this.bodyClass = this.availableClasses[this.currentClassIdx];

      this.changeBodyClass();
    }




    ngOnInit(): void {
      this.innerWidth = window.innerWidth;
      const numberBody = this.numberBody;
      //console.log(this.innerWidth);
      //console.log(this.bodyClass);
      //console.log(this.currentClassIdx + " body");
    }


  changeBodyClass() {
    // get html body element
    const bodyElement = document.body;

    if (bodyElement) {
      this.currentClassIdx = this.getNextClassIdx();
      const nextClass = this.availableClasses[this.currentClassIdx];
      const activeClass = this.availableClasses[this.getPrevClassIdx()];

      // remove existing class (needed if theme is being changed)
      bodyElement.classList.remove(activeClass);
      // add next theme class
      bodyElement.classList.add(nextClass);

      this.bodyClass = nextClass;
    }
  }

  getPrevClassIdx(): number {
    return this.currentClassIdx === 0
      ? this.availableClasses.length - 1
      : this.currentClassIdx - 1;
  }

  getNextClassIdx(): number {
    return this.currentClassIdx === this.availableClasses.length - 1
      ? 0
      : this.currentClassIdx + 1;
  }
}
