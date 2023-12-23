import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservationChildPage } from './observation-child.page';

const routes: Routes = [
  {
    path: '',
    component: ObservationChildPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservationChildPageRoutingModule {}
