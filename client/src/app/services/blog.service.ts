import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AuthService } from './auth.service'

@Injectable()

export class BlogService {
    options;
    domain = this.authService.domain;

    constructor(private http:Http,private authService:AuthService){

    }

    createAuthenticationHeaders(){
        this.authService.loadToken(); //get token so that it can be attached to headers

        //Header configuration options
        this.options= new RequestOptions({
            headers: new Headers({
                'Content-Type':'application/json', //Format set to JSON
                'authorization': this.authService.authtoken  //Attached token
            })
        });
    }
    getSingleBlog(blogId){
        this.createAuthenticationHeaders();
        return this.http.get(this.domain + 'blogs/singleBlog/' +blogId, this.options).map(res=>res.json());
    }
    
    getAllBlogs() {
        this.createAuthenticationHeaders();
        return this.http.get(this.domain +'blogs/allBlogs', this.options).map(res => res.json());
    }

    editBlog(blog) {
        this.createAuthenticationHeaders();
        return this.http.put(this.domain + 'blogs/updateBlog/', blog, this.options).map(res=>res.json());
    }
    
    newBlog(blog) {
        this.createAuthenticationHeaders();
        return this.http.post(this.domain +'blogs/newBlog', blog, this.options).map(res => res.json());
    }
}
