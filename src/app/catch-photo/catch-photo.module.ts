import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CatchPhotoPageRoutingModule } from './catch-photo-routing.module';

import { CatchPhotoPage } from './catch-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatchPhotoPageRoutingModule
  ],
  declarations: [CatchPhotoPage]
})
export class CatchPhotoPageModule {}
