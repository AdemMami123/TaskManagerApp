import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications: string[] = []; // Store notifications

  constructor() {
    this.loadNotifications(); // Load notifications from localStorage on service initialization
  }

  private loadNotifications(): void {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    this.notifications = storedNotifications;
  }

  saveNotifications(): void {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
  }

  addNotification(message: string): void {
    if (!this.notifications.includes(message)) {
      this.notifications.unshift(message); // Prepend the new notification
      this.saveNotifications(); // Save to localStorage whenever a notification is added
    }
  }

  removeNotification(notification: string): void {
    this.notifications = this.notifications.filter(n => n !== notification);
    this.saveNotifications(); // Save the updated notifications list to localStorage
  }
  

  getNotifications(): string[] {
    return this.notifications;
  }

  clearNotifications(): void {
    this.notifications = []; // Clear the notifications array
    this.saveNotifications(); // Save the cleared state to localStorage
  }
}
