import { Component, OnInit } from '@angular/core';

export interface Voter{
  id:string;
  sr_num: number;
  uname: String;
  email: String;
  address: String;
  publicKey:string;
  status:string;
  statusIssueMessage:string;
}

const VOTERS_DATA: Voter[] = [
  {id:"1",sr_num: 1,uname:"voter1",email:"voter1@demo.com",address:"demo1",publicKey:"",status:"pending",statusIssueMessage:""},  
  {id:"2",sr_num: 2,uname:"voter2",email:"voter2@demo.com",address:"demo2",publicKey:"",status:"pending",statusIssueMessage:""},  
];

@Component({
  selector: 'rd-manage-voters',
  templateUrl: './manage-voters.component.html',
  styleUrls: ['./manage-voters.component.scss']
})
export class ManageVotersComponent implements OnInit {

  displayedColumns: string[] = ['sr_num', 'uname', 'email', 'address','status','action'];
  voterDataSource:any = VOTERS_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
