import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  updateUserForm: FormGroup; // Form group for user details
  loading: boolean = false; // Indicates loading state
  errorMessage: string = ''; // Holds error messages

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router,
    private cookieService: CookieService // Inject CookieService
  ) {
    // Initialize the form with FormBuilder
    this.updateUserForm = this.fb.group({
      username: ['', [Validators.required]], // Username field with validation
      email: ['', [Validators.required, Validators.email]], // Email field with validation
      password: ['', [Validators.minLength(6)]], // Password field with validation
    });
  }

  ngOnInit(): void {
    // Get the token from cookies to fetch user profile
    const token = this.cookieService.get('token');
    if (token) {
      this.userService.getUserProfile().subscribe(
        (user) => {
          // Populate the form with user data
          this.updateUserForm.patchValue({
            username: user.username,
            email: user.email,
          });
        },
        (error) => {
          console.error('Error fetching user profile:', error);
          this.errorMessage = 'Failed to load user data. Please try again.';
        }
      );
    } else {
      this.errorMessage = 'You must be logged in to update your profile.';
    }
  }

  onSubmit(): void {
    if (this.updateUserForm.valid) {
      this.loading = true; // Set loading state
      this.userService.updateUserProfile(this.updateUserForm.value).subscribe(
        () => {
          this.loading = false;
          alert('Profile updated successfully!');
          this.router.navigate(['/profile']); // Redirect to profile page
        },
        (error) => {
          this.loading = false;
          this.errorMessage = 'Failed to update profile. Please try again.';
          console.error('Error updating profile:', error);
        }
      );
    }
  }
}
