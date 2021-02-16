import { Component, OnInit } from '@angular/core';
import { Election } from 'src/app/core/election';
import { ElectionService } from 'src/app/core/elections/election.service';


@Component({
  selector: 'rd-elections-joined',
  templateUrl: './elections-joined.component.html',
  styleUrls: ['./elections-joined.component.scss']
})
export class ElectionsJoinedComponent implements OnInit {

  displayedColumns: string[] = ['Id', 'name', 'start', 'end','action'];
  electionDataSource:any ;    //= ELECTION_DATA;

  constructor(private electionService:ElectionService) { }

  ngOnInit(): void {
    this.electionService.getAllElections().subscribe( (data) =>{
      //let elections:Election[] ;
      this.electionDataSource = data["response"];
      console.log(data["response"])
  })
  }
}
