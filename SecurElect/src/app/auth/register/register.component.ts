import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { LogService } from 'src/app/core/utils/log.service';

@Component({
  selector: 'rd-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterComponent implements OnInit {
  
  uname: String;
  email: String;
  pwd: String;
  confpwd: String;
  address: String;
  roleName: string;
  roleRefKey: string;
  err: BehaviorSubject<string>;
  roleBoxVisible:boolean = false;
  roleList:Array<string> = ['voter','admin'];
  userGroup = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    pwd: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    confpwd: new FormControl('', [Validators.required, this.confpwdMatcher]),
    address: new FormControl('', [Validators.required]),
    roleName : new FormControl(''),
    roleRefKey : new FormControl('')
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private regSnakeBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.err = new BehaviorSubject('');
  }

  register() {
    if (this.userGroup.invalid) {
      return;
    }
    this.setErr('');
    const user = this.userGroup.getRawValue();
    user.roles = [{name:user.roleName,refKey:user.roleRefKey}]
    user.status = "pending"
    delete user.roleName
    delete user.roleRefKey
    this.authService.auth_register(user).subscribe(
      (redirectUrl) => {
        this.openSnackBar('Account registered ', 'Successfully !');
        this.router.navigate([redirectUrl]);
      },
      (e) => this.setErr('Register failed. Please try again.')
    );
  }

  toggleRoleBox(){
    console.log(this.userGroup.get("roleName").value+"hello")
    if(this.userGroup.get("roleName").value == "admin"){
      this.roleBoxVisible=true;
    }else{
      this.roleBoxVisible=false;
    }
  }

  getEmailErrorMessage() {
    if (this.userGroup.get('email').hasError('required')) {
      return 'You must enter an email address';
    }

    return this.userGroup.get('email').hasError('email')
      ? 'Not a valid email address'
      : '';
  }

  getPwdErrorMessage() {
    if (this.userGroup.get('pwd').hasError('required')) {
      return 'You must enter a password';
    } else if (this.userGroup.get('pwd').hasError('minlength')) {
      return 'Minimum length is 3 letters';
    } else if (this.userGroup.get('pwd').hasError('maxlength')) {
      return 'Maximum length is 10 letters';
    }
    return '';
  }

  getConfpwdErrorMessage() {
    if (this.userGroup.get('confpwd').hasError('required')) {
      return 'You must enter a password again';
    }
    return 'Password did not matched with above';
  }

  hide = true;
  hide_conf = true;

  confpwdMatcher(cntrl: FormControl) {
    const tpwd = cntrl.root.get('pwd');
    const matched =
      cntrl?.value != tpwd?.value ? { confpwdMatcher: true } : null;
    return tpwd && matched;
  }

  openSnackBar(message: string, action: string) {
    this.regSnakeBar.open(message, action, {
      duration: 2000,
    });
  }

  private setErr(err: any) {
    return this.err.next(err);
  }
}