import { Component, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as t from 'apexcharts';
import moment from 'moment';
import { Subscription } from 'rxjs';
import { CanvasJS } from 'src/assets/canvasjs.angular.component';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexNonAxisChartSeries | any[];
};

@Component({
  selector: 'app-sitelevel',
  templateUrl: './sitelevel.page.html',
  styleUrls: ['./sitelevel.page.scss'],
})
export class SitelevelPage implements OnInit {
  location: any = '01'
  dt = [];
  show01 = false
  show02 = false
  show03 = false
  public chartOptions: any;
  options: any;

  id: any = '';
  show: boolean;
  image: string;
  level: any;
  showdate: any;
  levelall: any = [];
  title: string;
  isModalOpen: boolean = false;
  modalimage: any;
  // public options: any; // Partial<ChartOptions>;
  showall: any = [];

  dateTo = moment().format('YYYY-MM-DD');
  dateFrom = moment().subtract(1, 'd').format('YYYY-MM-DD');

  @Output() data: any;
  @Input() apiUrl: any;
  intervalPeriod: number;
  minutes: number;
  subscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingController: LoadingController,
  ) {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id == '01') {
      this.title = 'จุดที่ 1 บ่อพักน้ำดิบ';
    }
    if (this.id == '02') {
      this.title = 'จุดที่ 2 โรงสูบน้ำดิบ';
    }
    if (this.id == '03') {
      this.title = 'จุดที่ 3 บ่อกรอง';
    }

    // const colors: any = '#f23';
    // const chartjs: any = '#2f3';
    // const a: any = '#dd5'


    //   this.data = {
    //     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //     datasets: [{
    //       data: [65, 59, 80, 81, 56, 55, 40],
    //       label: 'Series A',
    //       backgroundColor: colors,
    //       borderColor: chartjs,
    //     }, {
    //       data: [28, 48, 40, 19, 86, 27, 90],
    //       label: 'Series B',
    //       backgroundColor: colors,
    //       borderColor: '#dd5',
    //     }, {
    //       data: [18, 48, 77, 9, 100, 27, 40],
    //       label: 'Series C',
    //       backgroundColor: colors,
    //       borderColor: '#123',
    //     },
    //     ],
    //   };

    //   this.options = {
    //     responsive: true,
    //     maintainAspectRatio: false,
    //     scales: {
    //       xAxes: [
    //         {
    //           gridLines: {
    //             display: true,
    //             color: a,
    //           },
    //           ticks: {
    //             fontColor: colors,
    //           },
    //         },
    //       ],
    //       yAxes: [
    //         {
    //           gridLines: {
    //             display: true,
    //             color: chartjs,
    //           },
    //           ticks: {
    //             fontColor: chartjs,
    //           },
    //         },
    //       ],
    //     },
    //     legend: {
    //       labels: {
    //         fontColor: a,
    //       },
    //     },
    //   };
  }

  ngOnInit() {
    // this.spackline();
    // this.minutes = 1 * 1000;
    // this.subscription = timer(0, this.minutes)
    //   .pipe(
    //     switchMap(() => {
    //       return this.getData();
    //     }),
    //     filter((data) => data !== undefined)
    //   )
    //   .subscribe((data) => {
    //     this.data = data;
    //     console.log(this.data);
    //   });
  }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setClose() {
    this.isModalOpen = false;
  }
  showdetail(item: any) {
    this.modalimage = 'http://202.129.205.39:3000/' + item?.image;
    this.level = item?.percent;
    this.showdate = item?.datetime;
    this.isModalOpen = true;
  }
  async getData() {
    const loading = await this.loadingController.create({
      message: 'กรุณารอสักครู่',
      duration: 2000,
    });
    await loading.present();
    fetch('http://202.129.205.39:8000/water_level_statistic', {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        var response = json;
        var format = response.map((item, index) => ({
          datetime: item.x.replaceAll('/', '-'),
          percent: item.y,
        }));
        this.levelall = format;
        this.showall = format;
        this.loadChart();
      });
    // await loading.onDidDismiss();
  }
  async loadChart() {
    var data = [];
    for (var i = 0; i < this.levelall.length; i++) {
      var thisdata = this.levelall[i];
      if (thisdata.percent > 1) {
        data.push([thisdata.datetime, Number(thisdata.percent).toFixed(2)]);
      }
    }
    this.options = {
      series: [
        {
          data: data,
        },
      ],
      chart: {
        id: 'area',
        type: 'area',
        height: 550,
        zoom: {
          autoScaleYaxis: true,
        },
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: '#999',
            label: {
              show: true,
              text: 'Average',
              style: {
                color: '#fff',
                background: '#00E396', //text Average
              },
            },
          },
        ],
        xaxis: [
          {
            x: new Date().getTime(),
            borderColor: '#999',
            yAxisIndex: 0,
            label: {
              show: true,
              text: 'Start',
              style: {
                color: '#fff',
                background: '#775DD0',
              },
            },
          },
        ],
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
        style: 'hollow',
      },
      xaxis: {
        type: 'datetime',
        // min: new Date(this.dateFrom).getTime(),
        // tickAmount: 6,
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy HH:mm:ss',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100],
        },
      },
      // stroke: {
      //   curve: "stepline"
      // },
    };
    const ApexCharts = t.default;
    const chartElement = document.querySelector('#chart_' + this.id);
    const chart = new ApexCharts(chartElement, this.options);
    chart.render();

    function onGetData(data) {
      const rand = Math.floor(Math.random() * 100);
      return data.push(['2023-02-09 ' + moment().format('HH:mm:ss'), rand]);
    }

    window.setInterval(function () {
      onGetData(data);
      chart.updateSeries([{ data: data }]);
    }, 1000);

  }
}