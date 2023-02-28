import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SitelevelPageRoutingModule } from './sitelevel-routing.module';

import { SitelevelPage } from './sitelevel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitelevelPageRoutingModule
  ],
  declarations: [SitelevelPage]
})
export class SitelevelPageModule {}
