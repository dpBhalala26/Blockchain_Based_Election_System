import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rd-view-election-joined',
  templateUrl: './view-election-joined.component.html',
  styleUrls: ['./view-election-joined.component.scss']
})
export class ViewElectionJoinedComponent implements OnInit {
  election_id:string
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.election_id = params.get("election_id");
      console.log(this.election_id);
    });
  }
  beCandidate(){
    console.log("requesting to be a candidate");
    //call election service and request as a candidate
  }
}