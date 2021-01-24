import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { merge, Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/user';

@Component({
  selector: 'rd-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SecurElect';
  user$: Observable<User>;
  constructor(
    private authService: AuthService,
    private router: Router,
    private regSnakeBar: MatSnackBar
  ) {}
  ngOnInit(): void {
      this.user$ = merge(this.authService.findJWT(), this.authService.user);
  }

  logout() {
    this.authService.auth_logout();
    this.openSnackBar('Logged Out ', 'Successfully !');
    this.router.navigate(['/auth/login']);
  }

  openSnackBar(message: string, action: string) {
    this.regSnakeBar.open(message, action, {
      duration: 2000,
    });
  }
}
