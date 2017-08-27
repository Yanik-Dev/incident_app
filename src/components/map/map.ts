import { Component, ViewChild, AfterViewInit, ElementRef, SimpleChanges } from '@angular/core';
import { Geolocation } from '@ionic-native/Geolocation';
import { Incident } from '../../models/incident'
declare var google;

import { LoadingController, Events, AlertController, ModalController } from "ionic-angular";
import { IncidentService } from "../../providers/incident.service";
import { PostCard } from "../post-card/post-card";
@Component({
  selector: 'map',
  templateUrl: 'map.html',
  providers:[Geolocation]
})
export class Map implements AfterViewInit {

  private isOnline:Boolean;
  public _alert:any;

  @ViewChild('map') mapElement: ElementRef;
  incidents : Array<Incident> = [];
  cachedIncident : Array<Incident> = [];
  
  map:any;
  
  constructor(private _geolocation: Geolocation,
              private _event:Events,
              private modal: ModalController,
              private _alertCntrl: AlertController,
              public incidentService: IncidentService,
              public loadingCtrl: LoadingController ) {
      
  }


  ngAfterViewInit(): void {
    this._event.subscribe('connectivity-change', (status)=>{
      this.isOnline = (status == "connected")?true:false;
      if(this.isOnline){
        if(this._alert!=null){ this._alert.dismiss()}
       
      }else{
        this.alert('No Internet Connection', "Please connection to the internet then try again");
      }
    })
    
    this.loadGoogleMap()
   
  }

  showModal(data){
    let mo = this.modal.create(PostCard,data)
    mo.present()
  }


  public loadGoogleMap(){
    
    if(!this._checkMap()){ 
      this.alert('No Internet Connection', "Please connection to the internet then try again");
    
    }else{
      this.initMap();
     
    }

  }

  private _checkMap(){
    if(typeof google == "undefined" || typeof google.maps == "undefined"){
        return false;
    }
    return true;
  }



  private alert(alertTitle:string, alertMsg:string){
    this._alert = this._alertCntrl.create({
      title: alertTitle,
      subTitle:alertMsg,
      buttons: [{
        text: 'Retry',
        handler: () => {
          this.loadGoogleMap();
        }
      }]
    });
    this._alert.present();

  }

  initMap() {
    if(this._alert != null) { this._alert.dismiss }

    this.map = null;
    this._geolocation.getCurrentPosition().then((position)=>{
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        draggable: true,
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.incidentService.findAll().subscribe((list)=>{
        this.incidents = [];
          for(let i = 0; i < list.length; i++){
           
            let now = new Date().toDateString()
            console.log(list[i].date_taken == now)
            if(list[i].date_taken == now){
              this.incidents.push({
                $key: list[i].$key,
                path: list[i].path,
                posted_by: list[i].post_by,
                date_taken:list[i].date_taken,
                location: list[i].location,
                comment: list[i].comment,
                icon: list[i].icon
              })

              let icon = "./assets/icon/"+list[i].icon+".png";
              let latLng = new google.maps.LatLng(list[i].location.latitude, list[i].location.longitude);
              
              let marker = new google.maps.Marker({
                map: this.map,
                position: latLng,
                icon: icon
              });
              let m = this;
             marker.addListener('click', function() {
              m.showModal(list[i]);
            });
            }
          
          }
      })

      this.addLocationMarker();
    }).catch(err=>{
      this.alert('Your Location is not detected', "Please enable your Location then try again")
    })
    
  }


  addLocationMarker(){        
     let marker = new google.maps.Marker({
       map: this.map,
       animation: google.maps.Animation.DROP,
       position: this.map.getCenter(),
     });
  }



  ngOnDestroy(){
  }


  
  markerExists(lat, lng){
    let exists = false;
    let cache = this.cachedIncident;
    for(var i = 0; i < cache.length; i++){
      if(cache[i].location.latitude.toFixed(4) === lat.toFixed(4) && cache[i].location.longitude.toFixed(4) === lng.toFixed(4)){
        exists = true;
        break;
      }
    }

    return exists;
  }

 


  handleLocationError(browserHasGeolocation, infoWindow, map) {
      infoWindow.setPosition(map.getCenter());
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
  }
    

}
