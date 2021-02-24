import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SmartContractService } from 'src/app/core/blockchain/smart-contract.service';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-view-election',
  templateUrl: './view-election.component.html',
  styleUrls: ['./view-election.component.scss']
})
export class ViewElectionComponent implements OnInit {

  constructor(private route:ActivatedRoute,private electionService:ElectionService,private snakeBar: MatSnackBar,private router:Router, private smartContractService : SmartContractService) { }
  election_id:string;
  ngOnInit(): void {
    console.log("this.election_id");
    this.route.paramMap.subscribe( params => {
      this.election_id = params.get("election_id");
      console.log(this.election_id);
    });
  }

  migrateElectionContract(){
    this.smartContractService.migrateElectionContract("","","","");
  }

  initializeVotingProcess(){
    this.smartContractService.initializeVotingProcess("");
  }

  castVote(){
    this.smartContractService.castVote("","");
  }

  finalizeVotingProcess(){
    this.smartContractService.finalizeVotingProcess("");
  }

  getElectionsResults(){
    this.smartContractService.getElectionsResults("");
  }

  getWinningCandidatesDetails(){
    this.smartContractService.getWinningCandidatesDetails("");
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

  takeToVotingBallot(electionId:string){
    this.router.navigate(["/voting-dashboard"])
  }
}
