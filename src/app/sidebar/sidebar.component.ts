import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'] // Adjust if necessary
})
export class SidebarComponent {
  isSidebarHidden: boolean = false;
  hiddenPages = ['/home', '/login', '/register']; // List your specific pages

  constructor(private router: Router) {
      this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
              this.isSidebarHidden = this.hiddenPages.includes(this.router.url);
          }
      });
  }
}
