import { Component, OnInit } from '@angular/core';
import * as t from 'apexcharts';
export type ChartOptions = {
  chart: ApexChart;
  series: ApexNonAxisChartSeries | any[];
}

@Component({
  selector: 'app-level',
  templateUrl: './level.page.html',
  styleUrls: ['./level.page.scss'],
})

export class LevelPage implements OnInit {
  public options: Partial<ChartOptions>;
  constructor() {
    //this.spackline();
  }

  ngOnInit() {

  }
  ionViewDidEnter() {
    //this.width='100%';
  }
  showchart() {
    this.options = {
      chart: {
        type: 'area',
        height: 350,
      },
      series: [{
        data: [12, 14, 2, 47]
      }]
    }
    const ApexCharts = t.default;
    const chartElement = document.querySelector('#chart');
    const chart = new ApexCharts(chartElement, this.options);
    chart.render();
  }
}
