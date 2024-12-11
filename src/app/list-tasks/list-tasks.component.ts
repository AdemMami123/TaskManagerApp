import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Router } from '@angular/router';
import { Modal, Toast } from 'bootstrap';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-list-tasks',
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.css'],
})
export class ListTasksComponent implements OnInit {
  tasks: any[] = [];
  pendingTasks: any[] = [];
  inProgressTasks: any[] = [];
  completedTasks: any[] = [];
  private deleteTaskId: string = '';

  constructor(
    private tasksService: TaskService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  // Fetch tasks from the API
  fetchTasks(): void {
    this.tasksService.getTasks().subscribe(
      (data) => {
        this.tasks = data;
        this.filterTasks();
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  // Filter tasks by status
  filterTasks(): void {
    this.pendingTasks = this.tasks.filter((task) => task.status === 'pending');
    this.inProgressTasks = this.tasks.filter(
      (task) => task.status === 'in-progress'
    );
    this.completedTasks = this.tasks.filter((task) => task.status === 'completed');
  }

  // Change task status
  changeStatus(task: any, direction: string): void {
    let newStatus = task.status;
    
    if (direction === 'right') {
      if (task.status === 'pending') {
        newStatus = 'in-progress';
      } else if (task.status === 'in-progress') {
        newStatus = 'completed';
      }
    } else if (direction === 'left') {
      if (task.status === 'in-progress') {
        newStatus = 'pending';
      } else if (task.status === 'completed') {
        newStatus = 'in-progress';
      }
    }

    task.status = newStatus;
    this.tasksService.updateTaskStatus(task._id, newStatus).subscribe(
      () => {
        this.fetchTasks();
        this.notificationService.addNotification(
          `Task "${task.title}" moved to ${newStatus}.`
        );
      },
      (error) => {
        console.error('Error updating task status:', error);
      }
    );
  }

  // Navigate to edit task page
  editTask(task: any): void {
    this.router.navigate(['/tasks/edit', task._id]);
  }

  // Open the delete confirmation modal
  openDeleteModal(id: string): void {
    this.deleteTaskId = id;
    const deleteModal = new Modal(document.getElementById('deleteModal')!);
    deleteModal.show();
  }

  // Confirm deletion and call deleteTask API
  confirmDelete(): void {
    if (this.deleteTaskId) {
      this.tasksService.deleteTask(this.deleteTaskId).subscribe(
        () => {
          this.fetchTasks();
          const deleteModal = Modal.getInstance(
            document.getElementById('deleteModal')!
          );
          if (deleteModal) deleteModal.hide();
        },
        (error) => {
          console.error('Error deleting task:', error);
        }
      );
    }
  }

  // Archive a task and remove it from the list
  archiveTask(taskId: string): void {
    this.tasksService.archiveTask(taskId).subscribe(
      () => {
        // Remove task from the completedTasks array after successful archive
        this.completedTasks = this.completedTasks.filter(
          (task) => task._id !== taskId
        );
        this.notificationService.addNotification(
          `Task has been archived successfully.`
        );
      },
      (error) => {
        console.error('Error archiving task:', error);
      }
    );
  }
}
