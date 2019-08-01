import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from '@app/material';
import { SimpleLayoutComponent } from './simple-layout/simple-layout.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { HeaderComponent } from './full-layout/header/header.component';
import { SidebarComponent } from './full-layout/sidebar/sidebar.component';
import { MenuComponent } from './full-layout/menu/menu.component';
import {
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective,
} from './menu-accordion';

@NgModule({
  declarations: [
    SimpleLayoutComponent,
    FullLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    MenuComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective,
  ],
  exports: [SimpleLayoutComponent, FullLayoutComponent],
  imports: [
    CommonModule,
    RouterModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MaterialModule,
    MatSidenavModule,
    MatToolbarModule,
    PerfectScrollbarModule,
    TranslateModule,
  ],
})
export class LayoutsModule {}

export { FullLayoutComponent, SimpleLayoutComponent };
