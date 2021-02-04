import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Election } from '../election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  constructor(private $http: HttpClient,private authservice:AuthService) { }
  private baseApiUrl = 'http://localhost:4250/api/election';
  getAllElections(): Observable<Election[]>{
    return this.$http.get(this.baseApiUrl+"?filter=byElectionAdmin") as Observable<Election[]>;
  }
  getElection(electionId:string): Observable<Election>{
    return this.$http.get(this.baseApiUrl+"/"+electionId) as Observable<Election>;
  }
  setElection(election): Observable<Election>{
    return this.$http.post(this.baseApiUrl,election) as Observable<Election>;
  }
  deleteElection(electionId): Observable<Election>{
    return this.$http.delete(this.baseApiUrl+"/"+electionId) as Observable<Election>;
  }

}