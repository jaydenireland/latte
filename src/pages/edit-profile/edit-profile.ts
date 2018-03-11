import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html'
})
export class EditProfilePage {
  public user : any = {
      'first_name': '',
      'last_name': '',
      'full_name': '',
      'avatar': '',
  }
  constructor(public navCtrl: NavController, public latteService: LatteServiceProvider) {

  }
  ionViewWillEnter() {
      this.user = this.latteService.user;
  }
  save() {
      this.latteService.editProfile(this.user.first_name, this.user.last_name).then(res => {
         this.navCtrl.pop();
      });
  }
}
