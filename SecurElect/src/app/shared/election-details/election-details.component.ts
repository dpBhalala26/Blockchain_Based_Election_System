import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit {

  @Input() election_id:string;
  election:Election;
  constructor(private electionService:ElectionService,private snakeBar: MatSnackBar,private router:Router) { }

  ngOnInit(): void {
    this.electionService.getElection(this.election_id).subscribe(
      (data)=>{
        console.log(data);
        this.election = data["response"]
      },
      (err) =>{
        console.error("election-details.getElection")
      })
  }

  deleteElection(){
    this.electionService.deleteElection(this.election_id).subscribe(
      (data)=>{
        console.log("election Deleted Successfully");
        this.snakeBar.open("Successfully Deleted Election");
        this.router.navigate(["election-admin/elections"])
      },
      (e)=>{
        console.log("Error in election Deleted ");
      }
    )
  }

}
