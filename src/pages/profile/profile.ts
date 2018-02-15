import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { App } from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { FollowListComponent } from '../../components/follow-list/follow-list';

import { HomePage } from '../home/home';
import { EditProfilePage } from '../edit-profile/edit-profile';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  public videos : any = [];
  public page: number = 1;
  public noMoreVideos : boolean = false;
  public user: any = {
    full_name: '',
    avatar: 'https://res.cloudinary.com/latte/image/upload/v1517766124/uDlDuIm_i5jglj.jpg'
  };
  constructor(public navCtrl: NavController,
              private storage: Storage,
              private http: HttpClient,
              public actionSheetCtrl: ActionSheetController,
              public latteService: LatteServiceProvider,
              public modalCtrl: ModalController,
              public appCtrl: App) {

  }
  ionViewDidEnter() {
      this.latteService.isLoggedIn().then(res => {
              this.videos = [];
              this.page = 1;
              let tempCall = this.latteService.whoAmI();
              this.user = tempCall.user;
              tempCall.promise.then(theUser => {
                  this.user = theUser;
              });

              this.getMyVideos();
      });
  }
  ionViewDidLeave() {
      this.videos = [];
      this.noMoreVideos = false;
      this.page=1;
  }
  openFollowing() {
      let modal = this.modalCtrl.create(FollowListComponent, {
          user: this.user.id,
          action: 'Following'
      });
      modal.present();
  }
  openFollowers() {
      let modal = this.modalCtrl.create(FollowListComponent, {
          user: this.user.id,
          action: 'Followers'
      });
      modal.present();
  }
  openSettings() {
      let actionSheet = this.actionSheetCtrl.create({
       title: 'Actions',
       buttons: [
         {
           text: 'Logout',
           role: 'destructive',
           handler: () => {
             this.storage.clear();
             this.latteService.user = this.latteService.oauth_token = null;
             this.appCtrl.getRootNav().push(HomePage);
           }
         }
       ]
     });
     actionSheet.present();
  }
  getMyVideos(ionInfinite=null) {
      this.latteService.getMyVideos(this.page)
     .then(res => {
          if (res) {
              this.videos = this.videos.concat((<any>Object).values(res));
              this.page++;
              if (ionInfinite !== null) ionInfinite.complete();
          } else {
              this.noMoreVideos = true;
              if (ionInfinite !== null) ionInfinite.complete();
          }
        }
      );
  }
  editProfile() {
      this.navCtrl.push(EditProfilePage);
  }
  playVideos(event=null) {
      (<any>document.querySelectorAll("video")).forEach(function(video) {
          var rect = video.getBoundingClientRect();
          var elemTop = rect.top;
          var elemBottom = rect.bottom;

          // Only completely visible elements return true:
          var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
          // Partially visible elements return true:
          //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
          if (isVisible) {
            video.play();
          } else {
            video.pause();
          }
      });
  }
}
