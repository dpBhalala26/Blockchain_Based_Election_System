import { Component, Input, OnInit } from '@angular/core';
import { SmartContractService } from 'src/app/core/blockchain/smart-contract.service';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-voting-ballot',
  templateUrl: './voting-ballot.component.html',
  styleUrls: ['./voting-ballot.component.scss']
})
export class VotingBallotComponent implements OnInit {
  @Input() election_id:string;
  displayedColumns: string[] = ['CandidateId', 'Name','action'];
  electionDataSource:any ;
  constructor(private electionService:ElectionService,private smartContractService:SmartContractService) { }

  ngOnInit(): void {
    if(this.election_id){
      this.electionService.getElection(this.election_id).subscribe( (data) =>{
        //let elections:Election[] ;
        this.electionDataSource = data["response"];
        console.log("Election Fetched",data["response"])
      })
    }
  }

  vote(candidateId:string){
    window.alert("voting for in "+this.election_id+" for candidate "+candidateId);
    //this.smartContractService.castVote(this.election_id,candidateId);
  }

}
