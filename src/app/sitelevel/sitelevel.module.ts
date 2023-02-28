import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SitelevelPageRoutingModule } from './sitelevel-routing.module';
import { SitelevelPage } from './sitelevel.page';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import * as CanvasJSAngularChart from '../../assets/canvasjs.angular.component';
import { NgxLoadingModule } from "ngx-loading";
// import { NgxChartsModule } from '@swimlane/ngx-charts';

var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SitelevelPageRoutingModule,
    AutocompleteLibModule,
    NgxLoadingModule,
    // NgxChartsModule
  ],
  declarations: [SitelevelPage, CanvasJSChart],
})
export class SitelevelPageModule { }

