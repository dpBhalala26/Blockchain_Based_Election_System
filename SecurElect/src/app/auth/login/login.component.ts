import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'rd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  pwd = new FormControl('', [Validators.required]);
  err: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private regSnakeBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.err = new BehaviorSubject('');
  }

  login() {
    this.setErr('');
    this.authService.auth_login(this.email.value, this.pwd.value).subscribe(
      (redirectUrl) => {
        
        this.openSnackBar('Logged in ', 'Successfully !');
        this.router.navigate([redirectUrl]);
      },
      (e) => this.setErr('Login failed. Please tryagain !')
    );
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter an email address';
    }

    return this.email.hasError('email') ? 'Not a valid email address' : '';
  }

  getPwdErrorMessage() {
    if (this.pwd.hasError('required')) {
      return 'You must enter a password';
    }
  }

  hide = true;

  openSnackBar(message: string, action: string) {
    this.regSnakeBar.open(message, action, {
      duration: 2000,
    });
  }

  private setErr(err: any) {
    return this.err.next(err);
  }
}
