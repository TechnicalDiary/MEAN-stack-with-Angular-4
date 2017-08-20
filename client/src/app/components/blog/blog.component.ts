import { Component} from '@angular/core';

@Component({
    selector:'blog',
    templateUrl:'./blog.component.html'
})

export class BlogComponent{

    messageClass;
    message;
    newPost = false;
    loadingBlogs = false;

    newBlogForm(){
        this.newPost = true;
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