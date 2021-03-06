import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppRouting } from './app.router'

import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BlogComponent } from './components/blog/blog.component';
import { EditBlogComponent } from './components/blog/edit-blog/edit-blog.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service'
import { NavbarService } from './services/navbar.service';
import { BlogService } from './services/blog.service';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard} from './guards/notAuth.guard';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent, DashboardComponent, RegisterComponent, LoginComponent,
    BlogComponent, ProfileComponent,EditBlogComponent 
  ],
  imports: [
    BrowserModule, AppRouting, ReactiveFormsModule, HttpModule
  ],
  providers: [AuthService, AuthGuard,NotAuthGuard, NavbarService, BlogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
