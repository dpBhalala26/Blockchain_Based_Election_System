import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';

@Component({
  selector: 'rd-elections-joined',
  templateUrl: './elections-joined.component.html',
  styleUrls: ['./elections-joined.component.scss']
})
export class ElectionsJoinedComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'name', 'start', 'end','action'];
  electionDataSource:any ;    //= ELECTION_DATA;
  electionDataSource$:Observable<any>;
  electionIdToJoin:string;
  constructor(private electionService:ElectionService) { }

  ngOnInit(): void {
    // this.electionService.getAllElections().subscribe( (data) =>{
    //   //let elections:Election[] ;
    //   this.electionDataSource = data["response"];
    //   console.log(data["response"])
    // })
    this.electionService.getAllElectionsJoinedInBehaviourSubject();
    this.electionDataSource$ = this.electionService.elections;
  }

  joinElection():void {
    var voterId = null
    this.electionService.joinElection(this.electionIdToJoin,voterId)
    window.alert('Joining Election!'+this.electionIdToJoin);
  }
}
