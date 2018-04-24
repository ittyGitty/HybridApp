import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComposeEmailPage } from './compose-email';

@NgModule({
  declarations: [
    ComposeEmailPage,
  ],
  imports: [
    IonicPageModule.forChild(ComposeEmailPage),
  ],
})
export class ComposeEmailPageModule {}
