import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  tasks: Task[] = [];
  completedTasks: number = 0;
  pendingTasks: number = 0;
  overdueTasks: number = 0;
  totalTasks: number = 0;

  // Calculate percentage for each type of task
  get completedTasksPercentage(): number {
    return (this.completedTasks / this.totalTasks) * 100 || 0;
  }

  get pendingTasksPercentage(): number {
    return (this.pendingTasks / this.totalTasks) * 100 || 0;
  }

  get overdueTasksPercentage(): number {
    return (this.overdueTasks / this.totalTasks) * 100 || 0;
  }

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks(); // Load tasks when the component initializes
  }

  // Fetch tasks from the service
  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.calculateStatistics(); // Calculate statistics after loading tasks
    });
  }

  // Calculate statistics for tasks
  calculateStatistics(): void {
    const today = new Date();
    this.totalTasks = this.tasks.length;

    // Count completed tasks
    this.completedTasks = this.tasks.filter(task => task.status === 'completed').length;

    // Count pending tasks (not completed and not in progress)
    this.pendingTasks = this.tasks.filter(task => task.status === 'pending').length;

    // Count overdue tasks (not completed and due date is past)
    this.overdueTasks = this.tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return task.status !== 'completed' && dueDate < today;
    }).length;
  }
}
