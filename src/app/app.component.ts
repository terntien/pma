import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'ตำแหน่งจุดตรวจวัด', url: '/location', icon: 'map' },
    { title: 'ปริมาณน้ำรายวัน', url: '/level', icon: 'analytics' },
    { title: 'ปริมาณน้ำรายสัปดาห์', url: '/weekly', icon: 'bar-chart' },
    /*
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    */
    { title: 'ข้อมูลการแจ้งเตือน', url: '/alert', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
