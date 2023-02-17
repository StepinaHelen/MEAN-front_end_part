import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  title: string;
  category: string;
  photo: string;
  text: string;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createPost(): any {
    const post = {
      title: this.title,
      category: this.category,
      photo: this.photo,
      text: this.text,
      author: JSON.parse(localStorage.getItem('user')).login,
      date: new Date(),
    };
    if (!post.title) {
      this.flashMessagesService.show('Enter title!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!post.category) {
      this.flashMessagesService.show('Select a category!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!post.photo) {
      this.flashMessagesService.show('Insert a photo!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!post.text) {
      this.flashMessagesService.show('Enter text!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }
    this.authService.createPost(post).subscribe((data: any) => {
      console.log(data);
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      }
    });
  }
}
