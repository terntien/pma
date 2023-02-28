import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalalertPageRoutingModule } from './modalalert-routing.module';

import { ModalalertPage } from './modalalert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalalertPageRoutingModule
  ],
  declarations: [ModalalertPage]
})
export class ModalalertPageModule {}
