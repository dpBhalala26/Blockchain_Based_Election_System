import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rd-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.scss']
})
export class VoterDetailsComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }
  voter_id:string;
  ngOnInit(): void {
    this.route.paramMap.subscribe( params => {
      this.voter_id = params.get("voter_id");
      console.log(this.voter_id);
    });
  }

}
