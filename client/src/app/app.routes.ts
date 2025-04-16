import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component'; // Assuming you have a RegisterComponent

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  //route for the login page
  {path: 'login', component:LoginComponent},
  //route for the register page
  {path: 'register', component:RegisterComponent}, 
];
