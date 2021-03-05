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
  selector: 'rd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() user: User;

  @Output() logoutEvent = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {
    
  }
  logout() {
    this.logoutEvent.emit('logoutEvent');
  }
}
