import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ListTasksComponent } from './list-tasks/list-tasks.component';
import { CreateTaskComponent } from './create-task/create-task.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { ListusersComponent } from './listeusers/listeusers.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './profile/profile.component';  // Add this line

import { SidebarComponent } from './sidebar/sidebar.component';

import { HelpComponent } from './help/help.component';
import { SettingsComponent } from './settings/settings.component';
import { AgendaComponent } from './agenda/agenda.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ArchivedTasksComponent } from './archived-tasks/archived-tasks.component'; // Add this line
import { CookieService } from 'ngx-cookie-service';
import { HabitTrackerComponent } from './habit-tracker/habit-tracker.component';
import { EditHabitComponent } from './edit-habit/edit-habit.component'; // Add this line







@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    ListTasksComponent,
    CreateTaskComponent,
    EditTaskComponent,
    ListusersComponent,
    UpdateUserComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    SidebarComponent,
    
    HelpComponent,
    SettingsComponent,
    AgendaComponent,
    StatisticsComponent,
    ArchivedTasksComponent,
    HabitTrackerComponent,
    EditHabitComponent, // Add this line
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule , // Add this module here
    ReactiveFormsModule,
    
    
    
    
    
    
  ],
  providers: [
    provideClientHydration(),
    [CookieService],
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
