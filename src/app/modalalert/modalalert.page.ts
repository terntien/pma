import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalalert',
  templateUrl: './modalalert.page.html',
  styleUrls: ['./modalalert.page.scss'],
})
export class ModalalertPage implements OnInit {
  @Input() name: any;
  @Input() title: any;
  @Input() image: any;
  constructor(private modalCtrl:ModalController) { }

  ngOnInit() {
  }

  confirm() {
    return this.modalCtrl.dismiss(null, '');
  }
}
