import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlocksRoutingModule } from './blocks-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../shared/shared.module';
import { ElectionAdminHeaderComponent } from './election-admin-header/election-admin-header.component';
import { AppComponent } from './root/app.component';
import { VoterHeaderComponent } from './voter-header/voter-header.component';
import { AnonymousHeaderComponent } from './anonymous-header/anonymous-header.component';


@NgModule({
  declarations: [AppComponent, HeaderComponent,  ElectionAdminHeaderComponent, VoterHeaderComponent, AnonymousHeaderComponent],
  imports: [
    CommonModule,
    BlocksRoutingModule,
    SharedModule
  ],
  exports:[HeaderComponent,AppComponent,ElectionAdminHeaderComponent]
})
export class BlocksModule { }
