import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class IncidentService {

  constructor(private _firebaseDb: AngularFireDatabase) {
  }

  public findAll():any{
    return this._firebaseDb.list("/incidentz")
  }

  public query(username):any{
    return this._firebaseDb.list("/incidentz").map((res)=>{
      return res.map((list)=>{
        if(list.posted_by.username == username){
          return list;
        }
      })
    });
  }

  public findOne(id:string):any{
    return this._firebaseDb.object("/incidentz/"+id);
  }

  public insert(incident):any{
    return this._firebaseDb.list("/incidentz").push(incident);
  }

  public update(incident):any{
    return this._firebaseDb.list("/incidentz").update(incident.$key, incident);
  }

  public remove(incident):any{
    return this._firebaseDb.list("/incidentz").remove(incident.$key);
  }

}
