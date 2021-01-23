import { Component, OnInit } from '@angular/core';

export interface Voter{
  uname: String;
    email: String;
    address: String;
    publicKey:string;
    status:string;
}

const VOTERS_DATA: Voter[] = [
  {uname: 'Voter1',email:"demo1@demo.com",address:"demo address",status:"pending", publicKey:""},  
  {uname: 'Voter2',email:"demo2@demo.com",address:"demo address",status:"pending", publicKey:""},  
  {uname: 'Voter3',email:"demo3@demo.com",address:"demo address",status:"pending", publicKey:""},  
];

@Component({
  selector: 'rd-manage-voters',
  templateUrl: './manage-voters.component.html',
  styleUrls: ['./manage-voters.component.scss']
})
export class ManageVotersComponent implements OnInit {

  displayedColumns: string[] = ['uname', 'email', 'address', 'status','publicKey'];
  electionDataSource:any = VOTERS_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
