import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';
import { Web3Service } from 'src/app/core/blockchain/web3.service';
import { Candidate } from 'src/app/core/candidate';

@Component({
  selector: 'rd-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit {

  @Input() election_id:string;
  @Output() takeToVotingEvent:EventEmitter<any> = new EventEmitter();
  //@Output() AllowToStandAsCandidate = new EventEmitter();
  displayedCandidateColumns: string[] = ['Id', 'name'];
  election:Election;
  allowVoting:boolean=false;

  panelOpenState = false;
  panel2OpenState = false;
  
  displayedResultColumns: string[] = ['Id', 'name','voteCount'];
  
  electionResult:Candidate[];

  constructor(private electionService:ElectionService,private web3Service:Web3Service,private snakeBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.electionService.getElection(this.election_id).subscribe(
      (data)=>{
        console.log(data);
        this.election = data["response"];
        this.election.id = this.election["_id"];
        var currentDate = new Date();
        if(this.election.startDate <= currentDate && this.election.endDate > currentDate){
          console.log("Voting is allowed in Election ")
          this.allowVoting = true
        }
        
      },
      (err) =>{
        console.error("election-details.getElection")
      })
    
      this.web3Service.getElectionsResults().subscribe(
        (result)=>{
          console.log(result);
          this.electionResult = result;
        },
        (err) =>{
          console.error("election-details.getElectionsResult()")
        });
  }
  takeToVoting(){
    window.alert("Taking to voting page");
    this.takeToVotingEvent.emit(this.election_id);
  }
}
