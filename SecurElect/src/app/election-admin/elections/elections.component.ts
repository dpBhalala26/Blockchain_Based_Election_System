import { Component, OnInit } from '@angular/core';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';


// const ELECTION_DATA: Election[] = [
//   {sr_no: 1, name: 'Tech Lead', start: new Date("2021-01-22"), end: new Date("2021-01-23")},
// ];

@Component({
  selector: 'rd-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'name', 'start', 'end','action'];
  electionDataSource:any ;    //= ELECTION_DATA;

  constructor(private electionService:ElectionService) { }

  ngOnInit(): void {
    this.electionService.getAllElections().subscribe( (data) =>{
      //let elections:Election[] ;
      this.electionDataSource = data["response"];
      console.log(data["response"])
  })
  }
  
  addElection(election){
    //election.position = "2";
    //this.electionDataSource.push(election);
    console.log("got election",election)
  }
}
