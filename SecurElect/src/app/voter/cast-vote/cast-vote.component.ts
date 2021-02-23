import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rd-cast-vote',
  templateUrl: './cast-vote.component.html',
  styleUrls: ['./cast-vote.component.scss']
})
export class CastVoteComponent implements OnInit {

  election_id:string;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.election_id = params.get("election_id");
      console.log(this.election_id);
    });
  }

}
