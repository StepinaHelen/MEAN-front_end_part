import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { EditModalComponent } from '../edit-modal/edit-modal.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  post$ = new Observable<any>();
  login: string = null;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.login = JSON.parse(localStorage.getItem('user')).login;
    }
    this.post$ = this.route.params.pipe(
      switchMap(({ id }) => this.authService.getPostById(id))
    );
  }

  deletePost(id: string) {
    this.authService.deletePost(id).subscribe((data) => {
      if (!data.success) {
        this.flashMessagesService.show('Post not deleted', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else {
        this.flashMessagesService.show('Post deleted', {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/']);
      }
    });
  }

  updatePost(postData: any) {
    this.matDialog
      .open(EditModalComponent, {
        height: '720px',
        width: '900px',
        data: {
          type: 'edit',
          post: postData,
        },
      })
      .afterClosed();
  }
}
