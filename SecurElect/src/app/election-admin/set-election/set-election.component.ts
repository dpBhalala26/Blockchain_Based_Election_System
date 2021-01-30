import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rd-set-election',
  templateUrl: './set-election.component.html',
  styleUrls: ['./set-election.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetElectionComponent implements OnInit {
  
  @Output() electionAddeded = new EventEmitter<any>();
  electionGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl(new Date().toISOString().slice(0, -1), [Validators.required]),
    endDate: new FormControl(new Date().toISOString().slice(0, -1), [Validators.required]),
  });

  err: BehaviorSubject<string>;
  constructor(private regSnakeBar: MatSnackBar) {}

  ngOnInit(): void {
    this.err = new BehaviorSubject('');
  }

  setElection() {
    if (this.electionGroup.invalid) {
      return;
    }
    this.setErr('');
    const election = this.electionGroup.getRawValue();
    console.log(election);
    // this.authService.auth_register(user).subscribe(
    //   (redirectUrl) => {
    //     this.openSnackBar('Account registered ', 'Successfully !');
    //     this.router.navigate([redirectUrl]);
    //   },
    //   (e) => this.setErr('Register failed. Please try again.')
    // );
    this.openSnackBar('election Addeded ', 'Successfully !');
    this.electionAddeded.emit(election)
  }

  openSnackBar(message: string, action: string) {
    this.regSnakeBar.open(message, action, {
      duration: 2000,
    });
  }



  private setErr(err: any) {
    return this.err.next(err);
  }

  getStartDateErrorMessage(){
    if(this.electionGroup.get('startDate').hasError('required')){
      return "start Date is Required"
    }
    else{
      return ""
    }
  }
}
