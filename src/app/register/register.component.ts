import { Component } from '@angular/core';
import { AuthentificationService } from '../services/authentification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: any = {};

  constructor(private userService: AuthentificationService, private router: Router) {}

  register() {
    const userData = {
      username: this.user.username,
      email: this.user.email,
      password: this.user.password,
    };

    this.userService.registerUser(userData).subscribe(
      (response) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during registration:', error);
        alert('Registration failed. Please try again.');
      }
    );
  }
}
