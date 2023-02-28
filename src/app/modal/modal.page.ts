import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  @Input() image:any;
  @Input() level:any;
  @Input() marker: any;
  showdate:any='';
  camid:any='02';
  showimage:any='';
  show=false;

  constructor(private modalCtrl: ModalController) { 
    console.log(this.marker) 
    fetch('http://202.129.205.39:3000/api/water/getlevel/'+this.image).then(res => res.json()).then(json => {
      //console.log(json); 
      var water=json.water[0]
      console.log(water); 
      if(water){
        this.show=true;
        this.showimage='http://202.129.205.39:3000'+water?.image;
        this.level=water?.percent
        this.showdate = water?.datetime
      }
    }); 
  }

  confirm() {
    return this.modalCtrl.dismiss(null, '');
  }
  ngOnInit() {
  }

}
