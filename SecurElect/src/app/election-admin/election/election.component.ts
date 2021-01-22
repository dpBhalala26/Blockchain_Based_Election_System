import { Component, OnInit } from '@angular/core';

export interface Election {
  name: string;
  position: number;
  start: Date;
  end: Date;
}

const ELECTION_DATA: Election[] = [
  {position: 1, name: 'Hydrogen', start: new Date("22/01/2021"), end: new Date("22-01-2021")},
  
];

@Component({
  selector: 'rd-election',
  templateUrl: './election.component.html',
  styleUrls: ['./election.component.scss']
})
export class ElectionComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'start', 'end'];
  electionDataSource:any = ELECTION_DATA;

  constructor() { }

  ngOnInit(): void {
  }
}
