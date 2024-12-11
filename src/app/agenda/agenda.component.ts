import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.css'],
})
export class AgendaComponent implements OnInit {
  tasks: Task[] = [];
  months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  currentYear: number;
  currentMonth: number;
  calendarDays: Date[] = [];

  constructor(private taskService: TaskService) {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth();
  }

  ngOnInit(): void {
    this.loadTasks();  // Load tasks when component initializes
    this.generateCalendar();  // Generate the current month's calendar
  }

  // Fetch the tasks
  loadTasks(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      console.log('Fetched tasks:', this.tasks);  // Debugging step to check tasks
    });
  }

  // Generate the calendar for the current month
  generateCalendar(): void {
    this.calendarDays = [];
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

    // Fill in days from the previous month
    for (let i = firstDay.getDay(); i > 0; i--) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth, -i));
    }

    // Fill in days for the current month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth, day));
    }

    // Fill in days from the next month if necessary to complete the 6x7 grid
    const remainingDays = 42 - this.calendarDays.length;
    for (let i = 1; i <= remainingDays; i++) {
      this.calendarDays.push(new Date(this.currentYear, this.currentMonth + 1, i));
    }
  }

  // Move to the previous month
  prevMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  // Move to the next month
  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  // Check if the given date is today's date
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }

  // Get tasks for a specific date
  getTasksForDate(date: Date): Task[] {
    const dateString = this.formatDate(date);  // Format the date to 'YYYY-MM-DD'

    return this.tasks.filter(task => {
      const taskDueDate = this.formatDate(new Date(task.dueDate));  // Format task due date
      return taskDueDate === dateString;  // Compare only the date part
    });
  }

  // Helper method to format the date as 'YYYY-MM-DD'
  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Add leading zero if necessary
    const day = date.getDate().toString().padStart(2, '0');  // Add leading zero if necessary
    return `${year}-${month}-${day}`;
  }

  // Check if a specific date has tasks with a certain status
  hasTaskWithStatus(date: Date, status: 'inprogress' | 'completed'): boolean {
    return this.getTasksForDate(date).some(task => task.status === status);
  }
}
