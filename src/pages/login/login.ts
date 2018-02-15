import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { CreateAccountPage } from '../create-account/create-account';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user = {
    username: '',
    password: ''
  };
  constructor(public navCtrl: NavController,
              public appCtrl: App,
              private http: HttpClient,
              private storage: Storage,
              public latteService: LatteServiceProvider,
              public toastCtrl: ToastController) {
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

   login() {
       this.latteService.login(this.user.username, this.user.password).then(success => {
        if (success) {
            this.toastCtrl.create({
             message: 'Successful login',
             duration: 3000,
             position: 'middle'
           }).present();
            this.navCtrl.goToRoot({direction: 'back'});
        } else {
            this.toastCtrl.create({
             message: 'Wrong login',
             duration: 3000,
             position: 'bottom'
           }).present();
        }
       });
   }
   newAccount() {
       this.navCtrl.push(CreateAccountPage);
   }
}
