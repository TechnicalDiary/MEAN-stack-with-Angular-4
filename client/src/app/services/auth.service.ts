import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class AuthService {
    domain = "http://localhost:8080/";
    authtoken;
    user; 
    options;

    constructor(
        private http:Http
    ){ }

    createAuthenticationHeaders(){
        this.loadToken();
        this.options = new RequestOptions({
            headers : new Headers({
                'Content-Type': 'application-json',
                'authorization':this.authtoken
            })
        })
    };

    loadToken() {
        this.authtoken = localStorage.getItem('token');
    }

    registerUser(user) {
        return this.http.post(this.domain + 'authentication/register', user ).map(res => res.json());
    }

    checkUsername(username) {
        return this.http.get(this.domain + 'authentication/checkUsername/' + username).map(res => res.json());
    }

    checkEmail(email) {
        return this.http.get(this.domain + 'authentication/checkEmail/' + email).map(res => res.json());
    }

    login(user) {
        return this.http.post(this.domain + 'authentication/login', user).map(res => res.json());
    }

    logout(){
        this.user = null;
        this.authtoken = null;
        localStorage.clear();
    }

    loggedIn(){
        this.loadToken();
        if(this.authtoken){
            return true;
        } else {
            return false;
        }
    }

    storeUserData(token, user){
        localStorage.setItem('token', token);
        localStorage.setItem('user',JSON.stringify(user));
        this.authtoken = token;
        this.user = user;
    }

    getProfile(){
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'authentication/profile', this.options).map(res => res.json());
    }
}