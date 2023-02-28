import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import { IonModal, ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  @ViewChild('map') mapRef: ElementRef;
  @ViewChild(IonModal) modal: IonModal;
  map: GoogleMap;
  linkto: any = '';

  isModalOpen: boolean = false;
  map01: any = [];
  show: boolean;
  image: string;
  level: any;
  showdate: any;
  marker: any;

  constructor(private modalCtrl: ModalController, private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
    //this.createMap();
  }

  ionViewDidEnter() {
    this.createMap();
  }
  ionViewWillEnter() {
    //this.createMap();
  }

  async createMap() {
    console.log('create map')
    this.map = await GoogleMap.create({
      id: 'map',
      apiKey: 'AIzaSyDwKs5XAmH0wjPpvIQYyfB7flm0Et0EzqU',
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: 15.684271,
          lng: 102.009889
        },
        zoom: 18
      }
    });
    await this.addMarkers();
  }

  async addMarkers() {
    console.log('AddMarkers')
    const markers: Marker[] = []
    //this.map.addMarker=null;
    await this.map.addMarker({
      coordinate: {
        lat: 15.684119,
        lng: 102.009306
      },
      title: 'จุดที่ 3 โรงสูบน้ำ',
      snippet: 'จุดที่ 3 โรงสูบน้ำ',
      // iconUrl: 'https://app.kckque.com/images/pwa.png',
      iconAnchor: {
        x: 50,
        y: 150
      }
    });

    await this.map.addMarker({
      coordinate: {
        lat: 15.684016,
        lng: 102.009889
      },
      title: 'จุดที่ 2 บ่อกรอง',
      snippet: 'จุดที่ 2 บ่อกรอง',
      // iconUrl: 'https://app.kckque.com/images/pwa.png',
      iconAnchor: {
        x: 50,
        y: 150
      }
    });

    await this.map.addMarker({
      coordinate: {
        lat: 15.684271,
        lng: 102.009889
      },
      title: 'จุดที่ 1 ถังเก็บน้ำดิบ',
      snippet: 'จุดที่ 1 ถังเก็บน้ำดิบ',
      // iconUrl: 'https://app.kckque.com/images/pwa.png',
      iconAnchor: {
        x: 50,
        y: 150
      }
    });


    this.map.setOnMarkerClickListener(async (marker) => {
      console.log('marker clicked')
      console.log(marker)
      this.show = false;
      this.marker = marker;
      if (marker.title == "จุดที่ 3 โรงสูบน้ำ") {
        this.linkto = '3'
        fetch('http://202.129.205.39:3000/api/water/getlevel/02').then(res => res.json()).then(json => {
          var water = json.water[0]
          //console.log(water); 
          if (water) {
            this.show = true;
            this.image = 'http://202.129.205.39:3000' + water?.image;
            this.level = water?.percent
            this.showdate = water?.datetime
            this.setOpen(true);
          }
        });
      }
      if (marker.title == "จุดที่ 2 บ่อกรอง") {
        this.linkto = '2'
        fetch('http://202.129.205.39:3000/api/water/getlevel/03').then(res => res.json()).then(json => {
          var water = json.water[0]
          //console.log(water); 
          if (water) {
            this.show = true;
            this.image = 'http://202.129.205.39:3000' + water?.image;
            this.level = water?.percent
            this.showdate = water?.datetime
            this.setOpen(true);
          }
        });

      }
      if (marker.title == "จุดที่ 1 ถังเก็บน้ำดิบ") {
        this.linkto = '1'
        fetch('http://202.129.205.39:3000/api/water/getlevel/01').then(res => res.json()).then(json => {
          var water = json.water[0]
          //console.log(water); 
          if (water) {
            this.show = true;
            this.image = 'http://202.129.205.39:3000' + water?.image;
            this.level = water?.percent
            this.showdate = water?.datetime
            this.setOpen(true);
          }
        });
      }
    })
  }

  showdetail() {
    //this.setOpen(false)
    //this.router.navigate(['/sitelevel/'+this.linkto])
  }

  setOpen(isOpen: boolean) {
    //fetch('http://202.129.205.39:3000/api/water/getlevel/01').then(res => res.json()).then(json => {
    //console.log(json);
    this.isModalOpen = isOpen;
    //}); 
  }

  setClose() {
    this.isModalOpen = false
  }
}
