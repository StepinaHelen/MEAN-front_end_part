import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.scss'],
})
export class RegComponent implements OnInit {
  name: string;
  login: string;
  email: string;
  password: string;

  constructor(
    private flashMessagesService: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  signUp(): any {
    const user = {
      name: this.name,
      login: this.login,
      email: this.email,
      password: this.password,
    };
    if (!user.name) {
      this.flashMessagesService.show('Enter your name!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!user.login) {
      this.flashMessagesService.show('Enter your login!', {
        cssClass: 'alert-danger',
        timeout: 3000,
      });
      return false;
    } else if (!user.email) {
      this.flashMessagesService.show('Enter your email!', {
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

    this.authService.registerUser(user).subscribe((data: any) => {
      if (!data.success) {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/reg']);
      } else {
        this.flashMessagesService.show(data.msg, {
          cssClass: 'alert-danger',
          timeout: 3000,
        });
        this.router.navigate(['/auth']);
      }
    });
  }
}
