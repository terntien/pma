import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'ตำแหน่งจุดตรวจวัด', url: '/location', },//icon: 'map'
    // { title: 'ปริมาณน้ำรายวัน', url: '/level', icon: 'analytics' },
    { title: 'ปริมาณน้ำรายสัปดาห์', url: '/weekly', }, //icon: 'bar-chart' 
    { title: 'ข้อมูลการแจ้งเตือน', url: '/alert', icon: 'warning' },//
  ];

  public subMenu = [
    { title: 'จุดที่ 1: บ่อพักน้ำดิบ', url: '/sitelevel/01' },
    { title: 'จุดที่ 2: โรงสูบน้ำดิบ', url: '/sitelevel/02' },
    { title: 'จุดที่ 3: บ่อกรอง', url: '/sitelevel/03' }
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() { }
}
