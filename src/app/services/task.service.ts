import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3001/api/tasks';

  constructor(private http: HttpClient) {}

  // Helper to get the token from localStorage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');  // Assuming the token is stored in localStorage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.apiUrl, task, { headers: this.getAuthHeaders() });
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getAuthHeaders() });
  }

  getTaskById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  updateTask(id: string, task: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task, { headers: this.getAuthHeaders() });
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
  updateTaskStatus(taskId: string, status: string): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${taskId}`, { status });
}

// TaskService 
getTasksByStatus(status: string): Observable<Task[]> {
  return this.http.get<Task[]>(`${this.apiUrl}/status/${status}`, { headers: this.getAuthHeaders() });
}

// Get archived tasks
getArchivedTasks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}?archived=true`);
}

// Archive a task
archiveTask(taskId: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/archive/${taskId}`, { archived: true });
}

// Unarchive a task
unarchiveTask(taskId: string): Observable<any> {
  return this.http.put<any>(`${this.apiUrl}/unarchive/${taskId}`, {});
}






  
  
}
