import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationChildPageRoutingModule } from './observation-child-routing.module';

import { ObservationChildPage } from './observation-child.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationChildPageRoutingModule
  ],
  declarations: [ObservationChildPage]
})
export class ObservationChildPageModule {}
