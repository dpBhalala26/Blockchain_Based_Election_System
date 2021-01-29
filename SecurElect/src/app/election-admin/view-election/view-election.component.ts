import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rd-view-election',
  templateUrl: './view-election.component.html',
  styleUrls: ['./view-election.component.scss']
})
export class ViewElectionComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  election_id:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.election_id = params.get("election_id");
      console.log(this.election_id);
    });
  }
}
