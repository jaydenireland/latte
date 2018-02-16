import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { App, ViewController, AlertController } from 'ionic-angular';
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
  public user = {
    username: '',
    password: ''
  };
  public attempts : number = 0;
  constructor(public navCtrl: NavController,
              public appCtrl: App,
              public alertCtrl: AlertController,
              private http: HttpClient,
              private storage: Storage,
              public latteService: LatteServiceProvider,
              public toastCtrl: ToastController) {
  }
  ionViewWillEnter()
   {
        this.attempts = 0;
        var tabbar = <HTMLElement>document.querySelector('.tabbar');
        tabbar.style.display = "none";

   }

   ionViewWillLeave()
   {

        var tabbar = <HTMLElement>document.querySelector('.tabbar');
        tabbar.style.display = 'flex';

   }
   passwordRecovery() {
       this.alertCtrl.create({
        title: 'Forgot password?',
        message: 'If you forgot your password you can reset it!',
        buttons: [
          {
              text: 'Forgot Password',
              handler: () => {
                console.log('Buy clicked');
              }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
     }).present();
   }
   login() {
       this.latteService.login(this.user.username, this.user.password).then(success => {
        if (success) {
            this.navCtrl.goToRoot({direction: 'back'});
        } else {
            if (this.attempts >= 2) {
                this.passwordRecovery();
            }
            this.attempts++;
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
