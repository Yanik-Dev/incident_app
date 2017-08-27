import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class NetworkService {

  public constructor(private _http: Http) {}


  /**
   * check to see if app is online
   * @return Promise<Boolean>
   */
  public isOnline(){
   return new Promise<boolean>((resolve, reject)=>{
      this._http.get("http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in ('JMDUSD')&env=store://datatables.org/alltableswithkeys&format=json").subscribe(res=>{
        resolve(true);
      }, err=>{
        resolve(false);
      })
   })
  }



}
