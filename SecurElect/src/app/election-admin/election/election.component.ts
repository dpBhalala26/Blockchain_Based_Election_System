import { Component, OnInit } from '@angular/core';

export interface Election {
  name: string;
  position: number;
  start: Date;
  end: Date;
}

const ELECTION_DATA: Election[] = [
  {position: 1, name: 'Project Lead', start: new Date('2021-01-22'), end: new Date('2021-01-23')},
  
];

@Component({
  selector: 'rd-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'start', 'end'];
  electionDataSource:any = [
    {position: 1, name: 'Project Lead', start: new Date('2021-01-22'), end: new Date('2021-01-23')},
    
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addElection(election){
    election.position = "2";
    this.electionDataSource.push(election);
    console.log("got election",election)

  }
}
