import { Component, OnInit } from '@angular/core';
import { HabitService } from '../services/habit.service';

@Component({
  selector: 'app-habit-tracker',
  templateUrl: './habit-tracker.component.html',
  styleUrls: ['./habit-tracker.component.css'],
})
export class HabitTrackerComponent implements OnInit {
  habits: any[] = [];
  newHabitTitle: string = '';
  newHabitFrequency: string = 'daily'; // Default frequency
  newHabitGoal: number | null = null; // Goal can be a number (optional)

  constructor(private habitService: HabitService) {}

  ngOnInit(): void {
    this.loadHabits(); // Fetch the habits when component is initialized
  }

  loadHabits(): void {
    this.habitService.getAllHabits().subscribe((data) => {
      console.log(data); // Debug: log the fetched data
      this.habits = data; // Assign fetched data to habits
    }, error => {
      console.error('Error fetching habits:', error); // Log any error
    });
  }

  createHabit(): void {
    if (this.newHabitTitle.trim() === '') {
      return;
    }

    const newHabit = {
      title: this.newHabitTitle,
      frequency: this.newHabitFrequency,
      goal: this.newHabitGoal, // Include goal
      progress: [],
    };

    this.habitService.createHabit(newHabit).subscribe(() => {
      this.loadHabits(); // Reload habits after creation
      this.newHabitTitle = ''; // Clear the input
      this.newHabitGoal = null; // Reset goal
    });
  }

  deleteHabit(habitId: string): void {
    this.habitService.deleteHabit(habitId).subscribe(() => {
      this.loadHabits(); // Reload habits after deletion
    });
  }

  markAsCompleted(habit: any): void {
    this.habitService.markAsCompleted(habit._id).subscribe(
      () => {
        this.loadHabits(); // Reload habits after updating progress
      },
      (error) => {
        console.error('Error marking habit as completed:', error);
      }
    );
  }

  isCompletedToday(habit: any): boolean {
    const today = new Date().toISOString().split('T')[0];
    return habit.progress.some(
      (p: any) => p.date === today && p.completed === true
    );
  }

  getCompletedProgress(habit: any): number {
    return habit.progress.filter((p: any) => p.completed).length;
  }

  editHabit(habit: any): void {
    // Logic for editing habit (e.g., open a modal or a form)
    // You can also allow updating the title, frequency, and goal
  }
}
