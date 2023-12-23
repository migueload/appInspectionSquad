import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssingPage } from './assing.page';

const routes: Routes = [
  {
    path: '',
    component: AssingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssingPageRoutingModule {}
