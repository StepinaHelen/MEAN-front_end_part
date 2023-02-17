import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public authService: AuthService,
    private flashMessagesService: FlashMessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  logoutUser() {
    this.authService.logout();
    this.flashMessagesService.show('You are loggedd out!', {
      cssClass: 'alert-success',
      timeout: 3000,
    });
    this.router.navigate(['/auth']);
  }
}
