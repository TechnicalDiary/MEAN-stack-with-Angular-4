import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { BlogService } from '../../services/blog.service';

@Component({
    selector:'blog',
    templateUrl:'./blog.component.html'
})

export class BlogComponent implements OnInit {

    messageClass;
    message;
    newPost = false;
    loadingBlogs = false;
    form;
    username;
    blogPosts;

    constructor(private formBuiler:FormBuilder, private authService:AuthService, private blogService:BlogService){
        this.createNewBlogForm();
    }

    ngOnInit(){
        this.authService.getProfile().subscribe(profile => {
            this.username = profile.user.username;
        });
        this.getAllBlogs();
    }

    getAllBlogs(){
        this.blogService.getAllBlogs().subscribe( data =>{
            this.blogPosts = data.blogs;
            console.log(this.blogPosts);
        })
    }

    createNewBlogForm(){
        this.form = this.formBuiler.group({
            title:['', Validators.compose([
                Validators.required,
                Validators.maxLength(30),
                Validators.minLength(5)
            ])],
            body:['',Validators.compose([
                Validators.required,
                Validators.maxLength(500),
                Validators.minLength(3)
            ])],
            createdBy:['', Validators.compose([
                Validators.required,
            ])]
        })
    }

    newBlogForm(){
        this.newPost = true;
    }

    goBack(){
        window.location.reload();
    }

    onBlogSubmit(){
        const blog = {
            title: this.form.get('title').value,
            body: this.form.get('body').value,
            createdBy: this.username
        };

        this.blogService.newBlog(blog).subscribe(data =>{
            if(!data.success){
                this.messageClass = 'alert alert-danger',
                this.message = data.message
            } else {
                this.messageClass = 'alert alert-success',
                this.message = data.message;
                this.getAllBlogs();
                setTimeout(() =>{
                    this.newPost = false;
                    this.message= null;
                    this.messageClass =""
                    this.form.reset();
                },1000);
            }
        })

    }

    reloadBlogs(){
        this.loadingBlogs = true;

        setTimeout(()=>{
            this.loadingBlogs = false;
        },2000)
    }

    draftComment(){

    }
    
}