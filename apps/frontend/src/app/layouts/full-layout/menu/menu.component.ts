import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
  constructor(public menuService: MenuService) {}

  addMenuItem(): void {
    this.menuService.add({
      state: 'menu',
      name: 'MENU',
      type: 'sub',
      icon: 'trending_flat',
      children: [{ state: 'menu', name: 'MENU' }, { state: 'timeline', name: 'MENU' }],
    });
  }
}
