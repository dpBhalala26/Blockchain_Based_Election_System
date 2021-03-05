import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rd-voting-dashboard',
  templateUrl: './voting-dashboard.component.html',
  styleUrls: ['./voting-dashboard.component.scss']
})
export class VotingDashboardComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  election_id:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.election_id = params.get("election_id");
      console.log(this.election_id);
    });
  }
}