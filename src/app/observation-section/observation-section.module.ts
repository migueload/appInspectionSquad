import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationSectionPageRoutingModule } from './observation-section-routing.module';

import { ObservationSectionPage } from './observation-section.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationSectionPageRoutingModule
  ],
  declarations: [ObservationSectionPage]
})
export class ObservationSectionPageModule {}
