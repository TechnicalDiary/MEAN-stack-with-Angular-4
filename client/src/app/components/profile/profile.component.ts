import { Component , OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector:'profile',
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit{

    user={};

    constructor(private authService:AuthService){
        
    }

    ngOnInit(){
        this.authService.getProfile().subscribe(profile =>{
            this.user = profile.user;
        })
    }
}