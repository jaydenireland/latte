import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { App } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the CreateAccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {
  public user : any = {
      username: '',
      password: '',
      first_name: '',
      last_name: ''
  };
  constructor(public navCtrl: NavController, public latteService: LatteServiceProvider, private toastCtrl: ToastController) {
  }

  ionViewWillEnter()
   {
        var tabbar = <HTMLElement>document.querySelector('.tabbar');
        tabbar.style.display = "none";

   }

   ionViewWillLeave()
   {

        var tabbar = <HTMLElement>document.querySelector('.tabbar');
        tabbar.style.display = 'flex';

   }
  addAccount() {
      this.latteService.createAccount(this.user.username, this.user.password, this.user.first_name, this.user.last_name).then(res => {
         if (res) {
             let toast = this.toastCtrl.create({
              message: 'User was added successfully',
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            this.navCtrl.pop();
         }
      });
  }

}
