import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userId: string = '';
  notifications: string[] = []; // Store notifications here

  constructor(private router: Router, UserService: UserService,private notificationService: NotificationService,private authService: AuthentificationService) {}

  ngOnInit() {
    // Fetch the logged-in user’s ID from localStorage or authentication service
    const loggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = loggedInUser?.id || '';  // Set the user ID for the router link
    this.notifications = this.notificationService.getNotifications(); // Fetch notifications
  }
  goToProfile() {
    // Navigate to the update user route
    this.router.navigate(['/update-user', this.userId]);
  }
  removeNotification(notification: string): void {
    this.notificationService.removeNotification(notification);
    // Update notifications to reflect changes in the header component
    this.notifications = this.notificationService.getNotifications();
  }
  clearAllNotifications(): void {
    this.notificationService.clearNotifications();
    this.notifications = []; // Update local notifications array
  }
  
  }
    