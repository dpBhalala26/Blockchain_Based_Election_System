import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Election } from '../election';

@Injectable({
  providedIn: 'root'
})
export class ElectionService {

  private electionsDataStore = new BehaviorSubject<Election[]>(null);

  get elections() {
    return this.electionsDataStore.asObservable();
  }

  constructor(private $http: HttpClient,private authservice:AuthService) { }
  private baseApiUrl = 'http://localhost:4250/api/election';


  private addElection(election) {
    //this.user$.next(user);
    if (election) {
      const newElections = [ ...this.electionsDataStore.value, election];
      console.log(newElections);
      this.electionsDataStore.next(newElections);
    } else {
      //this.electionsDataStore.next(null);
      window.alert('Error in adding Election')
    }
  }

  private removeElectionFromDataSource(electionIdToDelete) {
    //this.user$.next(user);
    if (electionIdToDelete) {
      var currentVal = this.electionsDataStore.value.filter(function(election,index,arr){
        return election.id!=electionIdToDelete
      })
      const newElections = { ...currentVal};
      this.electionsDataStore.next(newElections);
    } else {
      throw Error("Unable to remove");
      //window.alert('Error in adding Election')
    }
  }

  getAllElectionsJoinedInBehaviourSubject(){
    return this.$http.get(this.baseApiUrl+"?filter=byVoter").subscribe((response)=>{
      this.electionsDataStore.next(response["response"]);
    },
    (err)=>{

    });
  }

  getAllElections(): Observable<Election[]>{
    return this.$http.get(this.baseApiUrl+"?filter=byElectionAdmin") as Observable<Election[]>;
  }

  getAllElectionsJoined(): Observable<Election[]>{
    return this.$http.get(this.baseApiUrl+"?filter=byVoter") as Observable<Election[]>;
  }

  getElection(electionId:string): Observable<Election>{
    return this.$http.get(this.baseApiUrl+"/"+electionId) as Observable<Election>;
  }
  setElection(election): Observable<Election>{
    return this.$http.post(this.baseApiUrl,election) as Observable<Election>;
  }
  updateElection(election): Observable<Election>{
    return this.$http.put(this.baseApiUrl,election) as Observable<Election>;
  }
  deleteElection(electionId): Observable<any>{
    return this.$http.delete(this.baseApiUrl+"/"+electionId) as Observable<any>;
    //return (this.$http.delete(this.baseApiUrl+"/"+electionId) as Observable<Election>).pipe();
  }
  joinElection(electionId:string,voterId:string){
    //return this.$http.post(this.baseApiUrl+"/join-election",{electionId:electionId,voterId:voterId}).subscribe((response)=>{
    return this.$http.post(this.baseApiUrl+"/join-election/"+electionId,{}).subscribe((response)=>{
      console.log(response);
      this.addElection(response["response"]);
    },
    (err)=>{
      console.log("error in joining Election");
      throwError("Error while joining Election, Please Check Internet connection");
    });
  }

  joinElectionAsCandidate(electionId:string,candidateId:string){
    return this.$http.post(this.baseApiUrl+"/candidate-join-election/"+electionId,{}) as Observable<Election>
    // return this.$http.post(this.baseApiUrl+"/candidate-join-election/"+electionId,{})
    // .subscribe((response)=>{
    //   console.log(response);
    // },
    // (err)=>{
    //   console.log("error in joining Election as candidate");
    //   throwError("Error while joining Election as candidate, Please Check Internet connection");
    // });
  }
  
  changeElectionStatus(electionId,newStatus): Observable<Election>{
    return this.$http.put(this.baseApiUrl+"change-election-status",{"electionId":electionId,"status":newStatus}) as Observable<Election>;
  }

  /*Development Infrastructure */
  getElectionForTesting(electionId:string): Observable<Election>{
    return this.$http.get("assets/election.json").pipe(delay(1250)) as Observable<Election>;
  }
}