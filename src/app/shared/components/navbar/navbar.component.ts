import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  sidebarItems = [
    { label: 'List Products', url: '/list-products', icon: 'list' },
    { label: 'Create Product', url: '/create', icon: 'add' },

  ];
}
