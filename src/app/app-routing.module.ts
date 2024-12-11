import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListusersComponent } from './listeusers/listeusers.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { ProfileComponent } from './profile/profile.component';

import { AgendaComponent } from './agenda/agenda.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HelpComponent } from './help/help.component';
import { SettingsComponent } from './settings/settings.component';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component';
import { HabitTrackerComponent } from './habit-tracker/habit-tracker.component';
import { EditHabitComponent } from './edit-habit/edit-habit.component';


const routes: Routes = [
  //redirect empty path to home
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'tasks/edit/:id', component: EditTaskComponent },
  {path:'listusers',component:ListusersComponent},
  {path:'update-user/:id',component:UpdateUserComponent},
  {path:'list-tasks',component:ListTasksComponent},
  {path:'profile',component:ProfileComponent},
  
  { path: 'agenda', component: AgendaComponent },
  { path: 'help', component: HelpComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'archived-tasks', component: ArchivedTasksComponent },
  { path: 'habit', component: HabitTrackerComponent },
  { path: 'edit-habit/:id', component: EditHabitComponent },


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
