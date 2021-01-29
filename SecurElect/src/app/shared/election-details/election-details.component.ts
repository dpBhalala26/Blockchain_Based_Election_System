import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rd-election-details',
  templateUrl: './election-details.component.html',
  styleUrls: ['./election-details.component.scss']
})
export class ElectionDetailsComponent implements OnInit {

  @Input() election_id:string;

  constructor() { }

  ngOnInit(): void {
    
  }

}
