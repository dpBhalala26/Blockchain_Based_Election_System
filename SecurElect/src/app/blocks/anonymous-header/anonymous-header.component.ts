import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/user';

@Component({
  selector: 'rd-anonymous-header',
  templateUrl: './anonymous-header.component.html',
  styleUrls: ['./anonymous-header.component.scss']
})
export class AnonymousHeaderComponent implements OnInit {
  @Input() user: User;
  constructor() { }

  ngOnInit(): void {
  }

}
