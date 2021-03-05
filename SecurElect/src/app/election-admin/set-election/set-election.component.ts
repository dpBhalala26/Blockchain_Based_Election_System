import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-set-election',
  templateUrl: './set-election.component.html',
  styleUrls: ['./set-election.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetElectionComponent implements OnInit {
  
  electionGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startDate: new FormControl(new Date().toISOString().slice(0, -1), [Validators.required]),
    endDate: new FormControl(new Date().toISOString().slice(0, -1), [Validators.required]),
  });

  err: BehaviorSubject<string>;
  constructor(private regSnakeBar: MatSnackBar,private electionService:ElectionService,private router:Router) {}

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
    this.electionService.setElection(election).subscribe(
      (data)=>{
        console.log("created election",data);
        this.router.navigate(["election-admin/elections"]);
      },
      (err)=>{

      });
    this.openSnackBar('election Addeded ', 'Successfully !');
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
  getEndDateErrorMessage(){
    if(this.electionGroup.get('endDate').hasError('required')){
      return "end Date is Required"
    }
    else{
      return ""
    }
  }
}
