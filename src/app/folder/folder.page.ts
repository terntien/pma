import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { environment } from 'src/environments/environment';
import { GoogleMap, Marker } from '@capacitor/google-maps';
import * as ApexCharts from 'apexcharts';
import { IonModal, ModalController } from '@ionic/angular';
//import Apexchart from 'apexcharts'

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit { 
  @ViewChild('map')mapRef: ElementRef;
  @ViewChild(IonModal) modal: IonModal;

  map: GoogleMap;
  public folder: string;
  public showmap = false;
  public showalert = false;
  public showchart = false;
  isModalOpen: boolean = false;
  public showimage = '0';
  

  constructor(private activatedRoute: ActivatedRoute, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.folder=='Map-Location'){
      this.showmap = true ;
    }
    if(this.folder=='Water-Level'){
      this.showchart = true ;
      this.chartcreate();
    }
    if(this.folder=='Alert-Information'){
      this.showalert = true ;
    }
  }
  
  ionViewDidEnter(){
    if(this.folder=='Map-Location'){
      this.createMap();
    }
  }
  async createMap(){ 
    this.map = await GoogleMap.create({
      id:'map',
      apiKey:'AIzaSyDwKs5XAmH0wjPpvIQYyfB7flm0Et0EzqU',
      element: this.mapRef.nativeElement,
      config: {
        center: {
          lat: 15.684124,
          lng: 102.0092345
        },
        zoom: 19
      }
    });
    await this.addMarkers();
  }

  chartcreate(){ 
    console.log('chart created!!')
  }
  
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  async addMarkers(){ 
    await this.map.addMarker({
      coordinate: {
        lat: 15.684119,
        lng: 102.009306
      },
      title:'SHE',
      snippet:'SHE'
    });
    
    await this.map.addMarker({
      coordinate: {
        lat: 15.684016,
        lng: 102.009889
      },
      title:'SHE',
      snippet:'SHE'
    });
    
    await this.map.addMarker({
      coordinate: {
        lat: 15.684271,
        lng: 102.009889
      },
      title:'SHE',
      snippet:'SHE'
    });


    this.map.setOnMarkerClickListener( async (marker)=>{
      console.log(marker); 
      this.showimage = marker.markerId;
      console.log(this.showimage)
      this.setOpen(true);
    })

  }

}
