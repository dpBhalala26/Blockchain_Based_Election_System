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
  selector: 'rd-voter-header',
  templateUrl: './voter-header.component.html',
  styleUrls: ['./voter-header.component.scss']
})
export class VoterHeaderComponent implements OnInit {
  @Input() user: User;

  @Output() logoutEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }

}
