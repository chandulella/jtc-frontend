import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserBaseService } from '../services/user-base.service';
declare var jQuery :any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postForm: FormGroup;
  posts: any = []
  constructor(public fb: FormBuilder, public userBaseService: UserBaseService) { }

  ngOnInit() {
    this.postForm = this.fb.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'description': ['', Validators.compose([Validators.required,Validators.minLength(10)])]
    });
    this.getPosts()

  }
  getPosts() {
    this.userBaseService.getPosts().subscribe((res) => {
      if (res.posts) {
        this.posts = res.posts ? res.posts : []
        this.posts.map((ele) => {
          ele['option'] = false;
        })
      }
    })

  }
  updateLike(index, value) {
    console.log(index, value)
    if (value) {
      this.posts[index].likes = this.posts[index].likes - 1
    } else {
      this.posts[index].likes = this.posts[index].likes + 1
    }
    this.posts[index].option = !value
    this.userBaseService.updatePost(this.posts[index]._id, !value).subscribe((res) => {
      console.log(res)
    })
  }


  onSubmit() {
    jQuery('#btnCreatePost').text('Please Wait...').attr('disabled', true);
    this.userBaseService.createPost(this.postForm.value).subscribe((res) => {
      if (res.success) {
        jQuery('#btnCreatePost').text('Create Post').attr('disabled', true);
        jQuery('#btnCreatePost').attr('disabled', false);
        jQuery('#add-new-post').modal('hide');
        this.getPosts()
      }
    },(error)=>{
      // jQuery('#add-new-post').modal('hide');
      jQuery('#btnCreatePost').text('Create Post').attr('disabled', true);
    })
  }
}
