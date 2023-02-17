import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  login: string;
  password: string;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signIn(): any {
    const user = {
      login: this.login,
      password: this.password,
    };
    if (!user.login) {
      this.flashMessagesService.show('Enter your login!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!user.password) {
      this.flashMessagesService.show('Enter your password!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    }

    this.authService.authUser(user).subscribe((data: any) => {
      console.log(data, ' this.authService.authUser');
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
      } else {
        this.flashMessagesService.show('You have successfully logged in!', {
          cssClass: 'alert-success',
          timeout: 3000,
        });
        this.router.navigate(['/dashboard']);
        this.authService.storeUser(data.token, data.user);
      }
    });
  }
}
