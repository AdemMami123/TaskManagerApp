import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HabitService {
  private baseUrl = 'http://localhost:3001/api/habit'; // Adjust the API URL as needed

  constructor(private http: HttpClient) {}

  // Fetch all habits from backend
  getAllHabits(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:3001/api/allhabits`);
  }

  // Create a new habit
  createHabit(habit: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, habit);
  }

  // Delete a habit
  deleteHabit(habitId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${habitId}`);
  }

  // Update an existing habit (for marking completion or editing)
  updateHabit(habitId: string, habit: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${habitId}`, habit);
  }
  markAsCompleted(habitId: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/mark-completed/${habitId}`, {});
  }
  getHabitById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/habits/${id}`);
  }
  
}

