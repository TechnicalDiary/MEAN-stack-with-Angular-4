import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms'
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { BlogService } from '../../../services/blog.service';


@Component({
    selector:'edit-blog',
    templateUrl:'./edit-blog.component.html'
})

export class EditBlogComponent implements OnInit{
    message:any = false;
    messageClass;
    loading =true;
    processing=false;
    currentUrl;
    form;
    blog = {
        title:String,
        body:String
    };

    constructor(private formBuilder:FormBuilder, 
                private authService:AuthService, 
                private blogService:BlogService,
                private activatedRouted:ActivatedRoute,
                private router:Router,
                private location:Location){
        this.createEditBlogForm();
    }

    createEditBlogForm(){
        this.form = this.formBuilder.group({
            title:['', Validators.compose([
                Validators.required,
                Validators.minLength(5),
                Validators.maxLength(30)
            ])],
            body:['',Validators.compose([
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(500)
            ])]
        })
    }
    
    ngOnInit(){
        this.currentUrl = this.activatedRouted.snapshot.params;
        this.blogService.getSingleBlog(this.currentUrl.id).subscribe(data=>{
            if(!data.success){
                this.messageClass="alert alert-danger";
                this.message = data.message;
            } else {
                this.blog = data.blog;
                this.loading = false;
            }
        })
    };

    getSingleBlog(blogId){
    }

    goBack(){
        this.location.back();
    }


    onUpdateBlogSubmit(){
        this.processing=true;
        // this.blog.title = this.form.title.value;
        // this.blog.body = this.form.body.vlaue;
        this.blogService.editBlog(this.blog).subscribe(data =>{
            if(!data.success){
                this.messageClass = "alert alert-danger";
                this.message = data.message;
            } else {
                this.messageClass = "alert alert-success";
                this.message = data.message;
                setTimeout(()=>{
                    this.router.navigate(['/blog']);
                },1000);
            }
        })
    }

}