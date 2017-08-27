import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IncidentService } from "../../providers/incident.service";
import { User } from "../../models/user";
import { UserService } from "../../providers/user.service";
import { UploadService } from "../../providers/upload.service";
import { Incident } from "../../models/incident";

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  icons: string[];
  incidentz: Array<Incident> = [];
  user : User;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public incidentService: IncidentService,
              private uploadService: UploadService,
              public userService: UserService) {
      this.userService.getUser().then((res)=>{
        this.user = JSON.parse(res);
        this.incidentService.query(this.user.username).subscribe((list)=>{
            for(let i = 0; i < list.length; i++){
              this.incidentz.push({
                $key: list[i].$key,
                path: list[i].path,
                posted_by: list[i].post_by,
                date_taken:list[i].date_taken,
                location: list[i].location,
                comment: list[i].comment,
                icon: list[i].icon
              })
            }
        })
      })
     
  }

  delete(incident){
    this.uploadService.deleteUpload(incident.path).delete().then(()=>{
      this.incidentService.remove(incident).then(()=>{
        
      })
    })
   
  }
}
