import { Component, Input, Output, EventEmitter } from '@angular/core';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { NavParams, ViewController, NavController } from 'ionic-angular';
import { UserPage } from '../../pages/user/user';

/**
 * Generated class for the FollowListComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'follow-list',
  templateUrl: 'follow-list.html'
})
export class FollowListComponent {

  public followList : any;

  constructor(public latteService: LatteServiceProvider, public navParams:NavParams, public viewCtrl: ViewController, public navCtrl: NavController) {
      if (this.navParams.get('action') == "Followers") {
          latteService.getFollowers(this.navParams.get('user')).then(data => {
              console.log(data);
              this.followList = data;
              console.log(this);
          });
      } else if (this.navParams.get('action') == "Following") {
          latteService.getFollowing(this.navParams.get('user')).then(data => {
              console.log(data);
              this.followList = data;
              console.log(this);
          });
      }
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }
  openUser(userID) {
      this.navCtrl.push(UserPage, {
          userID: userID,
      });
  }
}
