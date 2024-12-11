import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-archived-tasks',
  templateUrl: './archived-tasks.component.html',
  styleUrls: ['./archived-tasks.component.css']
})
export class ArchivedTasksComponent implements OnInit {
  archivedTasks: any[] = []; // Store archived tasks
  errorMessage: string = '';

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchArchivedTasks(); // Fetch archived tasks when the component loads
  }

  // Fetch archived tasks from the service
  fetchArchivedTasks(): void {
    this.taskService.getArchivedTasks().subscribe(
      (data) => {
        // Filter tasks to include only those with archived: true
        this.archivedTasks = data.filter((task) => task.archived);
        console.log('Archived tasks:', this.archivedTasks);
      },
      (error) => {
        console.error('Error fetching archived tasks', error);
        this.errorMessage = 'Failed to load archived tasks.';
      }
    );
  }
  

  // Unarchive task 
  unarchiveTask(taskId: string): void {
    this.taskService.unarchiveTask(taskId).subscribe(
      (updatedTask) => {
        // Remove the unarchived task from the archived tasks list
        this.archivedTasks = this.archivedTasks.filter(task => task._id !== updatedTask._id);
        this.notificationService.addNotification(`Task "${updatedTask.title}" unarchived.`);
      },
      (error) => {
        console.error('Error unarchiving task', error);
        this.errorMessage = 'Failed to unarchive task.';
      }
    );
  }
}
