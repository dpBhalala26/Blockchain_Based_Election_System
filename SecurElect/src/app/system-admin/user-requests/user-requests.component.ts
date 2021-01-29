import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/user';
import { UserVerificationService } from 'src/app/core/validation/user-verification.service';

const USERS_DATA: User[] = [
  {uname:"voter1",email:"voter1@demo.com",address:"demo1",publicKey:"",status:"pending",statusIssueMessage:"",pwd:"",roles:[{name:"voter",refKey:""}]},  
  {uname:"voter2",email:"voter2@demo.com",address:"demo2",publicKey:"",status:"pending",statusIssueMessage:"",pwd:"",roles:[{name:"voter",refKey:""}]},  
];

@Component({
  selector: 'rd-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {

  displayedColumns: string[] = ['_id', 'uname', 'email','status','role','action'];
  //userDataSource:any = USERS_DATA;
  userDataSource:User[]=undefined;
  constructor(private userVerificationService:UserVerificationService) { }

  ngOnInit(): void {
    this.userVerificationService.getAllUnverifiedUsers().subscribe(data =>{
      this.userDataSource = data["response"];
      console.log(this.userDataSource);
    });
  }

  
}
