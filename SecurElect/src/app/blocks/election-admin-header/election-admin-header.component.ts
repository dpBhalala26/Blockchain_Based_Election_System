import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { User } from 'src/app/core/user';

@Component({
  selector: 'rd-election-admin-header',
  templateUrl: './election-admin-header.component.html',
  styleUrls: ['./election-admin-header.component.scss']
})
export class ElectionAdminHeaderComponent implements OnInit {
  @Input() user: User;

  @Output() logoutEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
