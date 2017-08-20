import { Component , OnInit} from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { NavbarService } from '../../services/navbar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit{

    isUserLogedin = false;

    constructor(private authService:AuthService, private router:Router, private navbarService:NavbarService){
    }

    ngOnInit(){
        this.checkUserAuthentication();
    }

    checkUserAuthentication(){
        if(localStorage.getItem('token')){
            this.isUserLogedin =true;  
        } else {
            this.isUserLogedin = false;
        }

    }


    onLogoutClick(){
        this.authService.logout();
        this.isUserLogedin = false;
        this.navbarService.resetNavbar();
        this.router.navigate(['/home']);
    }

} 