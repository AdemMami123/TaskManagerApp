import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isEditable = false;
  profileImage: string | ArrayBuffer | null = null;
  userProfile: any = {};  // To store the fetched user profile
  errorMessage: string = ''; // For error messages
  latitude: string = '';  // Store latitude
  longitude: string = '';  // Store longitude

  constructor(
    private userService: UserService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();  // Fetch user profile when component initializes
  }

  // Fetch user profile data including coordinates
  loadUserProfile(): void {
    const token = this.cookieService.get('token');
    if (token) {
      this.userService.getUserProfile().subscribe(
        (user) => {
          this.userProfile = user;
          this.latitude = user.latitude;  // Assign latitude
          this.longitude = user.longitude;  // Assign longitude
        },
        (error) => {
          console.error('Error fetching user profile:', error);
          this.errorMessage = 'Failed to load user data. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'You must be logged in to view your profile.';
    }
  }

  // Toggle between edit and view mode
  enableEditing() {
    this.isEditable = !this.isEditable;
  }

  // Handle image upload and preview
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }
}
