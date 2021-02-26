import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';
import { LogService } from '../utils/log.service';

@Injectable({
  providedIn: 'root'
})
export class UserVerificationService {
  private baseApiUrl = 'http://localhost:4250/api/auth/';

  constructor(private httpClient: HttpClient, private logService: LogService,private $http: HttpClient) { }
  getAllUnverifiedUsers(): Observable<User[]>{
    return this.$http.get(this.baseApiUrl+"pendingUsers") as Observable<User[]>;
  }

  setUserVerified(userId:string,publicKey:string): Observable<ArrayBuffer>{
    return this.$http.patch(this.baseApiUrl+"setUserVerified/"+userId,{"publicKey":publicKey}) as Observable<ArrayBuffer>;
  }

  requestModification(userId:string,statusIssueMessage:string): Observable<ArrayBuffer>{
    return this.$http.post(this.baseApiUrl+"setUserUnVerifiable/"+userId,{"statusIssueMessage":statusIssueMessage}) as Observable<ArrayBuffer>;
  }

   getUser(userId:string){
    return this.httpClient.get<User>(`${this.baseApiUrl}user/${userId}`)
  }

}