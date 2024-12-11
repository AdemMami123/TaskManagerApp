import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Toast } from 'bootstrap';
import { NotificationService } from '../services/notification.service';



@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  task: any = {
    title: '',
    description: '',
    dueDate: ''
  };

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router,private notificationService: NotificationService) {}

  ngOnInit(): void {
  const taskId = this.route.snapshot.paramMap.get('id');
  console.log('Task ID:', taskId); // Log the task ID

  if (taskId) {
    this.taskService.getTaskById(taskId).subscribe(
      (response) => {
        console.log('Fetched task:', response); // Log the response
        this.task = response;

        // Convert dueDate to the correct format if necessary
        if (this.task && this.task.dueDate) {
          // Check if dueDate is a string and parse it
          const date = new Date(this.task.dueDate);
          if (!isNaN(date.getTime())) { // Check if date is valid
            this.task.dueDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD
          } else {
            console.error('Invalid date format:', this.task.dueDate);
            this.task.dueDate = ''; // Set to empty string if invalid
          }
        }
      },
      (error) => {
        console.error('Error fetching task:', error);
      }
    );
  } else {
    console.error('No task ID provided.');
    this.router.navigate(['/list-tasks']); // Redirect or handle as needed
  }
}

  
  


  onSubmit() {
    const taskId = this.route.snapshot.paramMap.get('id');

    // Check if taskId is not null before using it
    if (taskId) {
      this.taskService.updateTask(taskId, this.task).subscribe(
        (response) => {
          console.log('Task updated:', response);

          // Show toast notification
          this.showToast();
          this.notificationService.addNotification(`Task "${this.task.title}" has been Updated.`);
          setTimeout(() => this.router.navigate(['/list-tasks']), 1500);
        },
        (error) => {
          console.error('Error updating task:', error);
        }
      );
    } else {
      console.error('No task ID provided during update.');
      // Handle accordingly, e.g., show an error message
    }
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