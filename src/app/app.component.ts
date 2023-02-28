import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import moment from 'moment';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'ตำแหน่งจุดตรวจวัด', url: '/location', },//icon: 'map'
    // { title: 'ปริมาณน้ำรายวัน', url: '/level', icon: 'analytics' },
    // { title: 'ปริมาณน้ำรายสัปดาห์', url: '/weekly', }, //icon: 'bar-chart' 
    // { title: 'ข้อมูลการแจ้งเตือน', url: '/alert', icon: 'warning' },//
  ];

  public subMenu = [
    { title: 'จุดที่ 1 บ่อพักน้ำดิบ', url: '/sitelevel/01' },
    { title: 'จุดที่ 2 โรงสูบน้ำดิบ', url: '/sitelevel/02' },
    { title: 'จุดที่ 3 บ่อกรอง', url: '/sitelevel/03' }
  ];

  alerts: any = [];
  datetime: any = [];
  constructor(private modalCtrl: ModalController) {
    fetch('http://202.129.205.39:3000/api/water/getperson').then(res => res.json()).then(json => {
      this.alerts = json?.person;
      var dd = moment.locale('th')
      this.datetime = moment(this.alerts.datetime).add(543, 'year').format('เวลา h:mm:ss  MMMM Do YYYY')
      console.log(this.alerts);
    });
  }

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  // constructor() { }
}
