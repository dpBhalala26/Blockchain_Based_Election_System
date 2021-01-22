import { Component, OnInit } from '@angular/core';

export interface Voter{
  name: string;
  position: number;
  start: Date;
  end: Date;
}

const VOTERS_DATA: Voter[] = [
  {position: 1, name: 'Hydrogen', start: new Date("22/01/2021"), end: new Date("22-01-2021")},  
];

@Component({
  selector: 'rd-manage-voters',
  templateUrl: './manage-voters.component.html',
  styleUrls: ['./manage-voters.component.scss']
})
export class ManageVotersComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'start', 'end'];
  electionDataSource:any = VOTERS_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
