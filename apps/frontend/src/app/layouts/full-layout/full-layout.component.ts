import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

import {
  PerfectScrollbarDirective,
  PerfectScrollbarConfigInterface,
} from 'ngx-perfect-scrollbar';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const SMALL_WIDTH_BREAKPOINT = 960;

@Component({
  selector: 'app-layout',
  templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent implements OnInit, OnDestroy {
  private _router!: Subscription;

  mediaMatcher: MediaQueryList = matchMedia(
    `(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`,
  );
  url!: string;
  sidePanelOpened = true;
  options = {
    collapsed: false,
    compact: false,
    boxed: false,
    dark: false,
    dir: 'ltr',
  };

  @ViewChild('sidemenu', { static: true }) sidemenu!: MatSidenav;
  @ViewChild(PerfectScrollbarDirective, { static: true })
  directiveScroll!: PerfectScrollbarDirective;

  public config: PerfectScrollbarConfigInterface = {};

  constructor(
    private _element: ElementRef,
    private router: Router,
    zone: NgZone,
  ) {
    this.mediaMatcher.addListener((mql) =>
      zone.run(() => {
        this.mediaMatcher = mql as any;
      }),
    );
  }

  ngOnInit(): void {
    this.url = this.router.url;

    this._router = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(event => event as NavigationEnd),
      )
      .subscribe((event: NavigationEnd) => {
        const el = document.querySelector(
          '.app-inner > .mat-drawer-content > div',
        );
        if (el) el.scrollTop = 0;

        this.url = event.url;
        this.runOnRouteChange();
      });
  }

  ngOnDestroy(): void {
    this._router.unsubscribe();
  }

  runOnRouteChange(): void {
    if (this.isOver()) {
      this.sidemenu.close();
    }

    this.updatePS();
  }

  receiveOptions($event: {
    collapsed: boolean;
    compact: boolean;
    boxed: boolean;
    dark: boolean;
    dir: string;
  }): void {
    this.options = $event;
  }

  isOver(): boolean {
    if (
      this.url === '/apps/messages' ||
      this.url === '/apps/calendar' ||
      this.url === '/apps/media' ||
      this.url === '/maps/leaflet' ||
      this.url === '/taskboard'
    ) {
      return true;
    } else {
      return this.mediaMatcher.matches;
    }
  }

  menuMouseOver(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'over';
    }
  }

  menuMouseOut(): void {
    if (this.mediaMatcher.matches && this.options.collapsed) {
      this.sidemenu.mode = 'side';
    }
  }

  updatePS(): void {
    if (!this.mediaMatcher.matches && !this.options.compact) {
      setTimeout(() => {
        this.directiveScroll.update();
      }, 350);
    }
  }
}
