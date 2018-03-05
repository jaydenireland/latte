import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';

@Component({
  selector: 'page-view',
  templateUrl: 'view.html'
})
export class ViewPage {
  public postID : number;
  public video : any = null;
  constructor(public navCtrl: NavController, public latteService: LatteServiceProvider, public navParams: NavParams) {
      this.postID = navParams.get('postID');
      this.latteService.getVideo(this.postID).then((res : any) => {
          this.video = res;
      });
  }

}
