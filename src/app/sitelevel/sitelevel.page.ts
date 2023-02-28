import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import * as t from 'apexcharts'; 
import moment from 'moment';

export type ChartOptions = {
  chart: ApexChart;
  series: ApexNonAxisChartSeries | any[];
}

@Component({
  selector: 'app-sitelevel',
  templateUrl: './sitelevel.page.html',
  styleUrls: ['./sitelevel.page.scss'],
})
export class SitelevelPage implements OnInit {
  id:any='';
  show: boolean;
  image: string;
  level: any;
  showdate: any;
  levelall: any = [];
  title: string;
  isModalOpen: boolean = false;
  modalimage: any;
  public options: any;// Partial<ChartOptions>;
  showall: any = [];
  
  dateTo = moment().format('YYYY-MM-DD');
  dateFrom = moment().subtract(1,'d').format('YYYY-MM-DD');

  constructor(private activatedRoute:ActivatedRoute, private loadingController:LoadingController) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id=='01'){
      this.title = 'จุดที่ 1 บ่อพักน้ำดิบ';
    }
    if (this.id=='02'){
      this.title = 'จุดที่ 2 โรงสูบน้ำดิบ';
    }
    if (this.id=='03'){
      this.title = 'จุดที่ 3 บ่อกรอง';
    }
    this.getData();
   }

  ngOnInit() {
    //this.spackline();
  }

  setOpen(isOpen: boolean) {  
    this.isModalOpen = isOpen; 
  }

  setClose(){
    this.isModalOpen = false
  }
  showdetail(item:any){
    this.modalimage = 'http://202.129.205.39:3000/'+item?.image
    this.level=item?.percent
    this.showdate = item?.datetime 
    this.isModalOpen = true
  }
  async getData(){ 
    const loading = await this.loadingController.create({
      message: 'กรุณารอสักครู่',
      duration: 2000
    });
    await loading.present();
    fetch('http://202.129.205.39:3000/api/water/getlevelday/'+this.id).then(res => res.json()).then(json => {
      var water=json?.water
      this.levelall = json?.water; 
      for(var i=0; i<water.length; i++){
        var thiswater = water[i]
        if(i<water.length-1){
          var cpwater = water[i+1]
          var a = moment(thiswater.datetime)
          var b = moment(cpwater.datetime) 
          if(a.diff(b, 'seconds')>60){
            this.showall.push(thiswater)
          }
        } 
      } 
      //console.log(this.levelall)  
      this.loadChart();
    }); 
    await loading.onDidDismiss(); 
  }
  async loadChart(){ 
    
    var data=[];
    for(var i=0; i<this.levelall.length; i++){
      var thisdata =this.levelall[i];
      if(thisdata.percent>1){
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
    const chartElement = document.querySelector('#chart_'+this.id);
    const chart = new ApexCharts(chartElement, this.options);
    chart.render();
  }
}
