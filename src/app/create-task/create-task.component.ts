import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Toast } from 'bootstrap';
import { NotificationService } from '../services/notification.service';




@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  task = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor(private taskService: TaskService,private notificationService: NotificationService) {}

  onSubmit() {
    this.taskService.createTask(this.task).subscribe(
      (response) => {
        console.log('Task created:', response);
        // Show a toast notification
        this.showToast();
        this.notificationService.addNotification(`Task "${this.task.title}" has been created.`);
        // Navigate to home after task creation
        setTimeout(() => window.location.href = '/list-tasks', 1500);


      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  //show toast notification
  private showToast(): void {
    const toastElement = document.getElementById('updateToast');
    if (toastElement) {
      const toast = new Toast(toastElement); // Initialize the toast
      setTimeout(() => toast.show(), 100); // Small delay to ensure the toast is shown
    }
  }
}