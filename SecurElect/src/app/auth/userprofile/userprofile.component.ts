import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/user';
import { LogService } from 'src/app/core/utils/log.service';

@Component({
  selector: 'rd-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
})
export class UserprofileComponent implements OnInit {
  user: User;
  userGroup: FormGroup;
  err: BehaviorSubject<string>;

  constructor(
    private router: Router,
    private authService: AuthService,
    private regSnakeBar: MatSnackBar,
    private logService: LogService
  ) {
    
  }

  ngOnInit(): void {
    this.err = new BehaviorSubject('');
    
    this.authService.user.subscribe((data) => {
      this.user = data;
      console.log('InProfile', this.user);
      if(this.user){
        this.userGroup = new FormGroup({
          uname: new FormControl(this.user.uname, [Validators.required]),
          email: new FormControl({value:this.user.email,disabled:true},[
            Validators.required,
            Validators.email
          ]),
          pwd: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(10),
          ]),/*
          confpwd: new FormControl('', [
            Validators.required,
            this.confpwdMatcher,
          ]),*/
          status: new FormControl({value:this.user.status,disabled:true}),
          address: new FormControl(this.user.address, [Validators.required]),
          roleName: new FormControl({value:this.user.roles[0].name,disabled:true}),
          roleRefKey: new FormControl(this.user.roles[0].refKey),
        }); 
        this.setErr(this.user.statusIssueMessage);
      }
    });
  }

  async update() {
    if (this.userGroup.invalid) {
      return;
    }
    const modifiedUser = this.userGroup.getRawValue();
    //delete modifiedUser.oldpwd;
    const updUser = this.authService.auth_update(modifiedUser).subscribe(
      (redirectUrl) => {
        this.openSnackBar('Account updated ', 'Successfully !');
        //this.router.navigate([redirectUrl]);
        window.location.reload();
      },
      (e) => this.setErr('Update failed. Please try again.')
    );
    if (!updUser) {
      this.setErr('Update Failed');
    }
  }

  delete() {
    if (!this.old_pwd_validate()) {
      this.setErr('Old Password did not match');
      return;
    }
    const delUser = this.authService.auth_delete(this.user.email);
    this.authService.auth_logout();
    this.router.navigate(['/']);
  }

  async old_pwd_validate() {
    if (this.userGroup.invalid) {
      return;
    }
    this.setErr('');
    const user = this.userGroup.getRawValue();
    
    const retUser = await this.authService
      .auth_old_pwd_validate(
        this.user.email.toString(),
        this.userGroup.get('pwd').value
      )
      .subscribe(
        (a) => console.log('Old password matched'),
        (e) => {
          return null;
        }
      ); // this.setErr('Old Password Not matched'));
    this.logService.log(retUser, `    `, typeof retUser, ` In old_pwd_vali`);
    if (retUser !== null) {
      return true;
    } else {
      return false;
    }
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
}
