import { Component, OnInit } from '@angular/core';
import { Election } from 'src/app/core/election';

const ELECTION_DATA: Election[] = [
  {sr_no: 1, name: 'Tech Lead', start: new Date("2021-01-22"), end: new Date("2021-01-23")},
];

@Component({
  selector: 'rd-elections-joined',
  templateUrl: './elections-joined.component.html',
  styleUrls: ['./elections-joined.component.scss']
})
export class ElectionsJoinedComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'name', 'start', 'end'];
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
