import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private apiUrl = 'http://localhost:3001/api/users';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  registerUser(userData: any): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/register`, userData, {
        headers: { 'Content-Type': 'application/json' },
      })
      .pipe(catchError(this.handleError));
  }

  loginUser(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login-user`;
    const body = { email, password };
    return this.http.post<any>(url, body).pipe(
      tap((response) => {
        console.log('Login response:', response);
      }),
      catchError((error) => {
        console.error('Error during login:', error);
        return throwError('Login failed. Please try again.');
      })
    );
  }

  getAuthHeaders(): HttpHeaders {
    const token = this.cookieService.get('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  isTokenValid(): boolean {
    const token = this.cookieService.get('token');
    return !!token; // Check if token exists
  }

  private handleError(error: any): Observable<never> {
    console.error('API error occurred:', error);
    return throwError('An error occurred; please try again.');
  }
}
