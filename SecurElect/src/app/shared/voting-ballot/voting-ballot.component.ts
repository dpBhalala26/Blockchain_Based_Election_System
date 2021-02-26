import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { SmartContractService } from 'src/app/core/blockchain/smart-contract.service';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-voting-ballot',
  templateUrl: './voting-ballot.component.html',
  styleUrls: ['./voting-ballot.component.scss'],
})
export class VotingBallotComponent implements OnInit {
  @Input() election_id: string;
  displayedColumns: string[] = ['CandidateId', 'Name', 'action'];
  electionDataSource: any;
  candidateToVote:string;
  privateKey: string;
  pkGroup: FormGroup;
  err: BehaviorSubject<string>;

  constructor(
    private electionService: ElectionService,
    private snakeBar: MatSnackBar,
    private smartContractService: SmartContractService
  ) {}

  ngOnInit(): void {
    if (this.election_id) {
      this.electionService.getElection(this.election_id).subscribe((data) => {
        //let elections:Election[] ;
        
        console.log('Election Fetched', data['response']);
        this.electionDataSource = data['response'];
      });

      this.err = new BehaviorSubject('');
      this.pkGroup = new FormGroup({
        privateKey: new FormControl('', [
          Validators.required,
          Validators.maxLength(64),
          Validators.minLength(64),
          Validators.pattern('[0-9A-Fa-f]{64}'),
        ]),
      });
      this.setErr('');
    }
  }
  private setErr(err: any) {
    return this.err.next(err);
  }

  vote(candidateId: string) {
    var privateKeyValue = this.pkGroup.get('privateKey').value;
    if(this.pkGroup.valid && privateKeyValue){
      window.alert(
        'voting for in ' + this.election_id + ' for candidate ' + candidateId
      );
      this.smartContractService.castVote(this.election_id, candidateId,privateKeyValue);
    }
    else{
      window.alert(
        'Please provide a valid private key in text box'
      );
    }
  }


  hide = true;
  getPrivateKeyErrorMessage(){
    if (this.pkGroup.get('privateKey').hasError('required')) {
      return 'You must enter a private key';
    } else if (this.pkGroup.get('privateKey').hasError('minlength')) {
      return 'Length of private key is 64 letters';
    } else if (this.pkGroup.get('privateKey').hasError('maxlength')) {
      return 'Length of private key is 64 letters';
    } else if (this.pkGroup.get('privateKey').hasError('pattern')) {
      return 'Private Key contains only 0-9, A-F and a-f';
    }
    return '';
  }
}
