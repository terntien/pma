import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as t from 'apexcharts';
import moment from 'moment';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexNonAxisChartSeries | any[];
}

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.page.html',
  styleUrls: ['./weekly.page.scss'],
})
export class WeeklyPage implements OnInit {
  location: any = '01'
  title: string;
  show01 = false
  show02 = false
  show03 = false
  description: string = 'การประปาบ้านค่าย จังหวัดชัยภูมิ';
  public options: any;// Partial<ChartOptions>;
  showall: any = [];
  dateTo = moment().format('YYYY-MM-DD');
  dateFrom = moment().subtract(4, 'd').format('YYYY-MM-DD');

  constructor(public loadingController: LoadingController) {
    this.triggerEvent()
  }

  ngOnInit() {
  }

  async triggerEvent() {
    this.showall = [];
    const loading = await this.loadingController.create({
      message: 'กรุณารอสักครู่',
      duration: 2000,
      showBackdrop: true
    });
    await loading.present();
    if (this.location == '01') {
      this.title = 'จุดที่ 1 บ่อพักน้ำดิบ';
      this.show01 = true
      this.show02 = false
      this.show03 = false
    }
    if (this.location == '02') {
      this.title = 'จุดที่ 2 โรงสูบน้ำดิบ';
      this.show01 = false
      this.show02 = true
      this.show03 = false
    }
    if (this.location == '03') {
      this.title = 'จุดที่ 3 บ่อกรอง';
      this.show01 = false
      this.show02 = false
      this.show03 = true
    }

    fetch('http://202.129.205.39:3000/api/water/getlevelweek/' + this.location).then(res => res.json()).then(json => {
      var water = json?.water
      for (var i = 0; i < water.length; i++) {
        var thiswater = water[i]
        if (i < water.length - 1) {
          var cpwater = water[i + 1]
          var a = moment(thiswater.datetime)
          var b = moment(cpwater.datetime)
          if (a.diff(b, 'seconds') > 60) {
            this.showall.push(thiswater)
          }
        }
      }
      //console.log(this.levelall)  
      this.loadChart();
    });
    const { role, data } = await loading.onDidDismiss();
  }

  loadChart() {
    var data = [];
    for (var i = 0; i < this.showall.length; i++) {
      var thisdata = this.showall[i];
      if (thisdata.percent > 1) {
        data.push([thisdata.datetime, Number(thisdata.percent).toFixed(2)])
      }
    }
    this.options = {
      series: [{
        data: data
      }],
      chart: {
        id: 'area-datetime',
        type: 'area',
        height: 350,
        zoom: {
          autoScaleYaxis: true
        }
      },
      annotations: {
        yaxis: [{
          y: 30,
          borderColor: '#999',
          label: {
            show: true,
            text: 'Average',
            style: {
              color: "#fff",
              background: '#00E396'
            }
          }
        }],
        xaxis: [{
          x: new Date().getTime(),
          borderColor: '#999',
          yAxisIndex: 0,
          label: {
            show: true,
            text: 'Start',
            style: {
              color: "#fff",
              background: '#775DD0'
            }
          }
        }]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        min: new Date(this.dateFrom).getTime(),
        tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
    };
    const ApexCharts = t.default;
    const chartElement = document.querySelector('#chart_' + this.location);
    const chart = new ApexCharts(chartElement, this.options);
    chart.render();
  }
}
