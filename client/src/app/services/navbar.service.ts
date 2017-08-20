import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  isAuthenticated: boolean;

  constructor() { this.resetNavbar() }

  resetNavbar() {
      if(localStorage.getItem('token')){
          this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false; 
      }
    }

//   show() { this.isAuthenticated = true; }

//   toggle() { this.isAuthenticated = !this.isAuthenticated; }

  doSomethingElseUseful() { }
}