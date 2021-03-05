import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';
import { Candidate } from 'src/app/core/candidate';
import { SmartContractService } from 'src/app/core/blockchain/smart-contract.service';

@Component({
  selector: 'rd-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.scss'],
})
export class ElectionDetailsComponent implements OnInit {
  @Input() election_id: string;
  @Output() takeToVotingEvent: EventEmitter<any> = new EventEmitter();
  //@Output() AllowToStandAsCandidate = new EventEmitter();
  displayedCandidateColumns: string[] = ['Id', 'name'];
  election: Election;
  allowVoting: boolean = false;

  panelOpenState = false;
  panel2OpenState = false;

  displayedResultColumns: string[] = ['Id', 'name', 'voteCount'];

  electionResult: Candidate[];

  constructor(
    private electionService: ElectionService,
    private smartContractService: SmartContractService,
    private snakeBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.electionService.getElection(this.election_id).subscribe(
      (data) => {
        console.log(data);
        this.election = data['response'];
        this.election.id = this.election['_id'];
        var currentDate = new Date();
        if (
          this.election.startDate <= currentDate &&
          this.election.endDate > currentDate
        ) {
          console.log('Voting is allowed in Election ');
          this.allowVoting = true;
        }
      },
      (err) => {
        console.error('election-details.getElection');
      }
    ); //,
    // this.smartContractService.getElectionsResults(this.election_id).then(
    //   (result)=>{
    //     console.log(result);
    //     this.electionResult = result;
    //   },
    //   (err) =>{
    //     console.error("election-details.getElectionsResult()"+ err);
    //   });
  }

  getElectionsResults() {
    this.smartContractService.getElectionsResults(this.election_id).then(
      (result) => {
        console.log(result);
        this.electionResult = result;
      },
      (err) => {
        console.error('election-details.getElectionsResult()' + err);
      }
    );
  }

  takeToVoting() {
    window.alert('Taking to voting page');
    this.takeToVotingEvent.emit(this.election_id);
  }

  tempRedirect() {
    //window.alert("button pressed: ");
    //console.log(this.election_id);
    var tempEId = this.election_id;
    this.router.navigate(['/voter/cast-vote/', tempEId]);
  }
}
