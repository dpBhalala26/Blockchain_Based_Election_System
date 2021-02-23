import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-view-election-joined',
  templateUrl: './view-election-joined.component.html',
  styleUrls: ['./view-election-joined.component.scss']
})
export class ViewElectionJoinedComponent implements OnInit {
  election_id:string
  constructor(private route:ActivatedRoute,private electionService:ElectionService,private snakeBar:MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.election_id = params.get("election_id");
      console.log(this.election_id);
    });
  }
  beCandidate(){
    console.log("requesting to be a candidate");
    //call election service and request as a candidate
    this.electionService.joinElectionAsCandidate(this.election_id,"").subscribe((data)=>{
      this.snakeBar.open("Now You Are A Candidate","",{
        duration: 2000,
      });
      window.location.reload()
    })
  }
}