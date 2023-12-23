import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservationSectionPage } from './observation-section.page';

const routes: Routes = [
  {
    path: '',
    component: ObservationSectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservationSectionPageRoutingModule {}
