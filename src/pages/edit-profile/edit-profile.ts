import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  public user : any = {
      'full_name': '',
      'avatar': '',
  }
  constructor(public navCtrl: NavController, public latteService: LatteServiceProvider) {

  }
  ionViewWillEnter() {
      let tempCall = this.latteService.whoAmI();
      this.user = tempCall.user;
      tempCall.promise.then(user => {
         this.user = user; 
      });
  }
}
