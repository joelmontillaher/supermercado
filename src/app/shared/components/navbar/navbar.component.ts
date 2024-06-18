import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  sidebarItems = [
    { label: 'List Products', url: '/list-products', icon: 'list' },
    { label: 'Create Product', url: '/create', icon: 'add' },
  ];
}
