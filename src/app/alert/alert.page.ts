import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalalertPage } from '../modalalert/modalalert.page';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
})

export class AlertPage implements OnInit {
  alerts:any=[];
  constructor(private modalCtrl: ModalController) { 
    fetch('http://202.129.205.39:3000/api/water/getperson').then(res => res.json()).then(json => { 
      this.alerts = json?.person;
      console.log(this.alerts);
    });
  }

  ngOnInit() { }

  async showAlert(image, name, title){
    
    const modal = await this.modalCtrl.create({
      component: ModalalertPage,
      componentProps: {
        image,
        name,
        title
      }, 
    });
    modal.present();
  }
  
}
