import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private userService: AuthentificationService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  loginUser() {
    this.userService.loginUser(this.email, this.password).subscribe(
      (response) => {
        const token = response.token;
        if (token) {
          const cookieExpirationDays = 7; // Store token for 7 days
          this.cookieService.set(
            'token',
            token,
            cookieExpirationDays,
            '/',
            '',
            true,
            'Strict'
          );
          alert('Login successful!');
          this.router.navigate(['/statistics']);
        } else {
          alert('No token received. Please try again.');
        }
      },
      (error) => {
        console.error(error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
