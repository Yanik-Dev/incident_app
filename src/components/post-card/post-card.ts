import { Input, Component } from '@angular/core';
import { ViewController } from "ionic-angular";

@Component({
  selector: 'post-card',
  templateUrl: 'post-card.html'
})
export class PostCard {

  /**
   * determined which type of card should be displayed
   * possible values: full or reduced
   */
  @Input() type : String;
  incident:any;
  constructor(public view: ViewController) {
    this.type = 'full'; 
    this.incident = this.view.data;

  }

  close(){
    this.view.dismiss();
  }

  change(){
    this.type = (this.type == 'full')?'reduced':'full';
  }
}
