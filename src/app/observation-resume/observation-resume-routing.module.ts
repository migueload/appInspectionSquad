import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservationResumePage } from './observation-resume.page';

const routes: Routes = [
  {
    path: '',
    component: ObservationResumePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservationResumePageRoutingModule {}
