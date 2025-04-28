import { ApiService } from './../api.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  errorMessage = '';
  constructor(private ApiService: ApiService) {}

  onLogin(event: Event): void {
    event.preventDefault();
    const loginData = {
      email: this.email,
      password: this.password
    };
    console
    this.ApiService.login(loginData).subscribe({
      next: (data) => {
        console.log('Login successful:', data);

      },
      error: (error) => {
        this.errorMessage = error.error.login.message || 'Login failed. Please try again.';
        console.error('Error during login:', this.errorMessage);

      }
    });
  }
}
