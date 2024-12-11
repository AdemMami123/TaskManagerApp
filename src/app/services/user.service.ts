import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service'; // Import CookieService

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3001/api/users'; // Add the base API URL

  // Inject HttpClient and CookieService
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/all`).pipe(catchError(this.handleError));
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, userData).pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  // Get user profile based on token
  getUserProfile(): Observable<any> {
    const token = this.cookieService.get('token'); // Fetch token from cookies
    if (!token) {
      return throwError(() => new Error('No authentication token found.'));
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Set Authorization header
    return this.http.get<any>(`${this.apiUrl}/profile`, { headers }).pipe(
      tap((response) => {
        console.log('User Profile:', response); // Debugging: log the response
      }),
      catchError((error) => {
        console.error('Error fetching user profile:', error); // Debugging: log error
        return throwError(() => new Error('Failed to fetch user profile.'));
      })
    );
  }

  // Update user profile
  updateUserProfile(userData: any): Observable<any> {
    const token = this.cookieService.get('token'); // Correct usage of cookieService
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}/profile`, userData, { headers }).pipe(
      tap((response) => {
        console.log('User profile updated:', response);
      }),
      catchError((error) => {
        console.error('Error updating user profile', error);
        return throwError(error);
      })
    );
  }

  // Handle API errors
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong with the API request.'));
  }
}
