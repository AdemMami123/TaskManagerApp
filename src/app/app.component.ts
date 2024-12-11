import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root', // Replace with your component selector
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  showHeader: boolean = true; // Controls header visibility

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Hide header on login and register pages
        const currentRoute = event.urlAfterRedirects;
        this.showHeader = !(currentRoute.includes('/login') || currentRoute.includes('/register'));
      }
    });
  }
}
