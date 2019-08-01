import { Injectable } from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string | any[];
  name: string;
  type?: string;
}

export interface Menu {
  state?: string | any[];
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

const MENUITEMS: Menu[] = [
  {
    state: 'dashboard',
    name: 'DASHBOARD.NAME',
    type: 'link',
    icon: 'home',
  },
];

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  getAll(): Menu[] {
    return MENUITEMS;
  }

  add(menu: Menu) {
    MENUITEMS.push(menu);
  }
}
