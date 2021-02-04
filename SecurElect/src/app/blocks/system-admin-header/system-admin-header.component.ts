import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/core/user';

@Component({
  selector: 'rd-system-admin-header',
  templateUrl: './system-admin-header.component.html',
  styleUrls: ['./system-admin-header.component.scss']
})
export class SystemAdminHeaderComponent implements OnInit {

  @Input() user: User;

  @Output() logoutEvent = new EventEmitter<any>();
  constructor(private router: Router, private snakeBar: MatSnackBar) { }

  statusMessage = 'Your profile is unverifiable, needs modification '
  ngOnInit(): void {
    if (this.user.status == 'unverifiable') {
      this.statusMessage = 'Your profile is unverifiable, needs modification '
      let snackBarRef = this.snakeBar.open(
        this.statusMessage,
        'view'
      );
      snackBarRef.onAction().subscribe(() => {
        //console.log('The snack-bar action was triggered!');
        this.router.navigate(["auth/userprofile"]);
      });

    } else if (this.user.status == 'modified') {
      this.statusMessage = 'Your profile is unverifiable, needs modification '
      let snackBarRef = this.snakeBar.open(
        this.statusMessage,
        'view'
      );
      snackBarRef.onAction().subscribe(() => {
        //console.log('The snack-bar action was triggered!');
        this.router.navigate(["auth/userprofile"]);
      });
    } else if (this.user.status == 'verified-un-notified') {
      this.snakeBar.open('You are now verified user', 'Ok');
    }
  }

}
