import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HabitService } from '../services/habit.service';
import { Toast } from 'bootstrap';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-edit-habit',
  templateUrl: './edit-habit.component.html',
  styleUrls: ['./edit-habit.component.css']
})
export class EditHabitComponent implements OnInit {
  habit: any = {
    name: '',
    description: '',
    frequency: '',
  };

  constructor(
    private habitService: HabitService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const habitId = this.route.snapshot.paramMap.get('id');
    console.log('Habit ID:', habitId);

    if (habitId) {
      this.habitService.getHabitById(habitId).subscribe(
        (response) => {
          console.log('Fetched habit:', response);
          this.habit = response;
        },
        (error) => {
          console.error('Error fetching habit:', error);
        }
      );
    } else {
      console.error('No habit ID provided.');
      this.router.navigate(['/list-habits']); // Redirect or handle as needed
    }
  }

  onSubmit() {
    const habitId = this.route.snapshot.paramMap.get('id');

    if (habitId) {
      this.habitService.updateHabit(habitId, this.habit).subscribe(
        (response) => {
          console.log('Habit updated:', response);

          this.showToast();
          this.notificationService.addNotification(`Habit "${this.habit.name}" has been Updated.`);
          setTimeout(() => this.router.navigate(['/list-habits']), 1500);
        },
        (error) => {
          console.error('Error updating habit:', error);
        }
      );
    } else {
      console.error('No habit ID provided during update.');
    }
  }

  private showToast(): void {
    const toastElement = document.getElementById('updateToast');
    if (toastElement) {
      const toast = new Toast(toastElement);
      setTimeout(() => toast.show(), 100);
    }
  }
}
