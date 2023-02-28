import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LevelPageRoutingModule } from './level-routing.module';
import { LevelPage } from './level.page';
import { NgApexchartsModule } from 'ng-apexcharts';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LevelPageRoutingModule, 
    NgApexchartsModule
  ],
  declarations: [LevelPage]
})
export class LevelPageModule {}
