import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/user';
import { LogService } from 'src/app/core/utils/log.service';
import { UserVerificationService } from 'src/app/core/validation/user-verification.service';

@Component({
  selector: 'rd-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  user: User;
  myFromGroup: FormGroup;
  err: BehaviorSubject<string>;
  //statusIssueMessage: string ;
  userId: string;

  constructor(
    private router: Router,
    private userVerificationService: UserVerificationService,
    private regSnakeBar: MatSnackBar,
    private logService: LogService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.err = new BehaviorSubject('');

    this.route.paramMap.subscribe((paramMap) => {
      this.userId = paramMap.get('userId');
      this.userVerificationService.getUser(this.userId).subscribe((data) => {
        this.user = data['user'];
        console.log('In init', this.user);
        if (this.user) {
          console.log('creating form group');
          this.myFromGroup = new FormGroup({
            statusIssueMessage:new FormControl(this.user.statusIssueMessage,[Validators.required]),
            uname: new FormControl({ value: this.user.uname, disabled: true }),
            email: new FormControl({ value: this.user.email, disabled: true }),
            status: new FormControl({
              value: this.user.status,
              disabled: true,
            }),
            address: new FormControl({
              value: this.user.address,
              disabled: true,
            }),
            roleName: new FormControl({
              value: this.user.roles[0].name,
              disabled: true,
            }),
            roleRefKey: new FormControl({
              value: this.user.roles[0].refKey,
              disabled: true,
            }),
          });
          console.log(this.myFromGroup.getRawValue())
          //this.setErr(this.user.statusIssueMessage);
          console.log('after init');
        }
      });
    });
  }

  async verifyUser() {
    if (!this.userId) {
      return;
    }
    console.log('verifying user', this.userId);
    const response = this.userVerificationService
      .setUserVerified(this.userId)
      .subscribe(
        (d) => {
          this.openSnackBar('User status updated ', 'Successfully !');
          this.router.navigate(['system-admin/user-requests']);
        },
        (e) => {
          this.setErr('Update failed. Please try again.');
        }
      );
  }

  async requestModification() {
    var statusIssueMessage = this.myFromGroup.getRawValue()["statusIssueMessage"];
    console.log("In RequestModification: MSG:",statusIssueMessage)
    if (!statusIssueMessage || statusIssueMessage == '') {
      this.setErr('Please provide Issue Message');
    } else if (!this.userId) {
      this.setErr('User Id not loaded ');
    } else {
      console.log('Requesting user for modification', this.userId);
      const response = this.userVerificationService
        .requestModification(this.userId,statusIssueMessage)
        .subscribe(
          (d) => {
            this.openSnackBar('User status updated to \"modification required\"', 'Successfully !');
            this.router.navigate(['system-admin/user-requests']);
          },
          (e) => {
            this.setErr('Update failed. Please try again.');
          }
        );
    }
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
