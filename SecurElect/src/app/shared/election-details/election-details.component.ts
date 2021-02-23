import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as EventEmitter from 'events';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit {

  @Input() election_id:string;
  @Output() takeToVotingEvent = new EventEmitter();
  //@Output() AllowToStandAsCandidate = new EventEmitter();
  displayedCandidateColumns: string[] = ['Id', 'name'];
  
  election:Election;
  allowVoting:boolean=false;
  constructor(private electionService:ElectionService,private snakeBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.electionService.getElection(this.election_id).subscribe(
      (data)=>{
        console.log(data);
        this.election = data["response"];
        this.election.id = this.election["_id"];
        var currentDate = new Date();
        if(this.election.startDate <= currentDate){
          this.allowVoting = true
        }
      },
      (err) =>{
        console.error("election-details.getElection")
      })
  }
  takeToVoting(){
    this.takeToVotingEvent.emit(this.election_id);
  }
}
