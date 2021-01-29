import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/core/user';

@Component({
  selector: 'rd-system-admin-header',
  templateUrl: './system-admin-header.component.html',
  styleUrls: ['./system-admin-header.component.scss']
})
export class SystemAdminHeaderComponent implements OnInit {

  @Input() user: User;

  @Output() logoutEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
