import { Component, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthService } from '../../services/auth.service';

@Component({
    selector:'app-register',
    templateUrl: './register.component.html'
})


export class RegisterComponent implements OnInit{

    registrationForm: FormGroup;
    message;
    messageClass;
    
    constructor( private formBuilder:FormBuilder, private authService:AuthService){
        
    }
    ngOnInit(){
        this.createForm();
    }

    createForm() {
        this.registrationForm = this.formBuilder.group({
            email: ['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30),
                this.validateEmail
            ])],
            username: ['', Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
                this.validateUsername
            ])],
            password: ['', Validators.compose([
                Validators.required,
                Validators.minLength(8),
                Validators.maxLength(30),
                this.validatePassword
            ])],
            confirm: ['', Validators.compose([
                Validators.required
            ])]
        }, {validator: this.matchningPasswords});
    }

    validateEmail(controls) {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(regExp.test(controls.value)){
            return null;
        } else {
            return {'validateEmail':true}
        }
    }

    validateUsername (controls){
        const regExp = /^[a-zA-Z0-9]+$/;
        if(regExp.test(controls.value)){
            return null;
        } else {
            return {'validateUsername':true}
        }
    }

    validatePassword (controls){
        const regExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        if(regExp.test(controls.value)){
            return null;
        } else {
            return {'validatePassword':true}
        }
    }

    matchningPasswords (c: AbstractControl){
        if(c.get('password').value === c.get('confirm').value) {
            return null;
        } else {
            return { 'matchningPasswords':true}
        }
    }

    checkEmail() {
        this.authService.checkEmail(this.registrationForm.get('email').value).subscribe(data =>{
            if(!data.success){
                this.messageClass = "alert alert-success";
                this.message = data.message;
            } else {
                this.messageClass = "alert alert-danger";
                this.message = data.message;
            }
        })
    }

    checkUsername() {
        this.authService.checkUsername(this.registrationForm.get('username').value).subscribe(data =>{
            if(!data.success){
                this.messageClass = "alert alert-success";
                this.message = data.message;
            } else {
                this.messageClass = "alert alert-danger";
                this.message = data.message;
            }
        })
    }

    onRegistratinFromSubmit(){
        console.log(this.registrationForm);
        const user = {
            email: this.registrationForm.get('email').value,
            username: this.registrationForm.get('username').value,
            password: this.registrationForm.get('password').value
        }
        this.authService.registerUser(user).subscribe(data =>{
            if (!data.success){
                this.messageClass = "alert alert-danger";
                this.message = data.message;
            } else {
                this.messageClass = "alert alert-success";
                this.message = data.message;
            }
        })
        
    }
}