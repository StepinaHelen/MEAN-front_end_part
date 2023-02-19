import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  category: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.getAllPosts()
      .subscribe(posts => {
      this.posts = posts;
    })
  }

  setCtegory(category: string) {
    this.category = category;
  }

}
