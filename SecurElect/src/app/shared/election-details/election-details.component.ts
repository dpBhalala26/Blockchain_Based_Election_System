import { Component, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';

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
  allowVoting:boolean=true;

  panelOpenState = false;
  
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
    window.alert("Taking to voting page");
    this.takeToVotingEvent.emit(this.election_id);
  }

  tempRedirect(){
    //window.alert("button pressed: ");
    //console.log(this.election_id);
    var tempEId = this.election_id;
    this.router.navigate(["/voter/cast-vote/",tempEId]);
  }
}
