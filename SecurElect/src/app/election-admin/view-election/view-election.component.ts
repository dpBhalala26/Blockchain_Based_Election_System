import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SmartContractService } from 'src/app/core/blockchain/smart-contract.service';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-view-election',
  templateUrl: './view-election.component.html',
  styleUrls: ['./view-election.component.scss'],
})
export class ViewElectionComponent implements OnInit {
  privateKey: string;
  pkGroup: FormGroup;
  err: BehaviorSubject<string>;

  constructor(
    private route: ActivatedRoute,
    private electionService: ElectionService,
    private snakeBar: MatSnackBar,
    private router: Router,
    private smartContractService: SmartContractService
  ) {}
  election_id: string;
  ngOnInit(): void {
    console.log('this.election_id');
    this.route.paramMap.subscribe((params) => {
      this.election_id = params.get('election_id');
      console.log(this.election_id);
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

  migrateElectionContract() {
    this.smartContractService.migrateElectionContract(
      this.election_id,
      '',
      '',
      '',
      this.pkGroup.get('privateKey').value
    );
  }

  initializeVotingProcess() {
    this.smartContractService.initializeVotingProcess(this.election_id, this.pkGroup.get('privateKey').value);
  }

  castVote() {
    this.smartContractService.castVote(this.election_id, '', this.pkGroup.get('privateKey').value);
  }

  finalizeVotingProcess() {
    this.smartContractService.finalizeVotingProcess(this.election_id, this.pkGroup.get('privateKey').value);
  }

  getElectionsResults() {
    this.smartContractService.getElectionsResults(this.election_id, this.pkGroup.get('privateKey').value);
  }

  getWinningCandidatesDetails() {
    this.smartContractService.getWinningCandidatesDetails(this.election_id, this.pkGroup.get('privateKey').value);
  }

  deleteElection() {
    this.electionService.deleteElection(this.election_id).subscribe(
      (data) => {
        console.log('election Deleted Successfully');
        this.snakeBar.open('Successfully Deleted Election');
        this.router.navigate(['election-admin/elections']);
      },
      (e) => {
        console.log('Error in election Deleted ');
      }
    );
  }

  takeToVotingBallot(electionId: string) {
    this.router.navigate(['/voting-dashboard']);
  }

  private setErr(err: any) {
    return this.err.next(err);
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
