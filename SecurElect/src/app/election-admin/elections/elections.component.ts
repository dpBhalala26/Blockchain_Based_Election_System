import { Component, OnInit } from '@angular/core';
import { Election } from 'src/app/core/election';


const ELECTION_DATA: Election[] = [
  {sr_no: 1, name: 'Tech Lead', start: new Date("2021-01-22"), end: new Date("2021-01-23")},
];

@Component({
  selector: 'rd-elections',
  templateUrl: './elections.component.html',
  styleUrls: ['./elections.component.scss']
})
export class ElectionsComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'name', 'start', 'end','action'];
  electionDataSource:any = ELECTION_DATA;

  constructor() { }

  ngOnInit(): void {
  }
  
  addElection(election){
    election.position = "2";
    //this.electionDataSource.push(election);
    console.log("got election",election)
  }
}
