import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AssingPageRoutingModule } from './assing-routing.module';
import { AssingPage } from './assing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AssingPage,
    AssingPageRoutingModule
  ],
  declarations: []
})
export class AssingPageModule {}
