import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservationResumePageRoutingModule } from './observation-resume-routing.module';

import { ObservationResumePage } from './observation-resume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservationResumePageRoutingModule
  ],
  declarations: [ObservationResumePage]
})
export class ObservationResumePageModule {}
