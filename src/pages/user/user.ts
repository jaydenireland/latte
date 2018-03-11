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

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})
export class UserPage {
  public videos : any = [];
  public page: number = 1;
  public userID : number;
  public reposts : any = [];
  public currentTab : string = "posts";
  public repostsPage : number = 1;
  public user: any = {
      full_name: '',
      avatar: 'https://res.cloudinary.com/latte/image/upload/v1517766124/uDlDuIm_i5jglj.jpg'
  };
  public currentUser : any = {
      id: 0
  };
  constructor(public navCtrl: NavController,
              private storage: Storage,
              private http: HttpClient,
              public actionSheetCtrl: ActionSheetController,
              public latteService: LatteServiceProvider,
              public navParams: NavParams,
              public appCtrl: App,
              public modalCtrl: ModalController) {
        this.userID = navParams.get('userID');

  }
  ionViewWillEnter() {

      // let tempCall = this.latteService.whoAmI();
      // this.currentUser = tempCall.user;
      // tempCall.promise.then(user => {
      //    this.currentUser = user;
      // });
      this.videos = this.reposts =  [];
      this.page = this.repostsPage = 1;
      this.user = this.latteService.user;
      this.latteService.whoAmI();
      this.latteService.getProfile(this.userID).then(data => {
          this.user = data;
          this.getVideos();
          this.getReposts();
      });

  }
  ionViewWillLeave() {
      this.videos = [];
      this.page=1;
      (<any>document.querySelectorAll("video")).forEach(function(video) {
         video.pause();
      });
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
  getVideos(ionInfinite=null) {
      this.latteService.getUserVideos(this.user.id, this.page)
     .then(res => {
          if (res) {
              this.videos = this.videos.concat((<any>Object).values(res));
              this.page++;
              if (ionInfinite !== null) ionInfinite.complete();
          } else {
              this.page = 1;
              if (ionInfinite !== null) ionInfinite.complete();
          }
        }
      );
  }
  getReposts(ionInfinite=null) {
      this.latteService.getUserReposts(this.user.id, this.repostsPage)
     .then(res => {
          if (res) {
              this.reposts = this.reposts.concat((<any>Object).values(res));
              this.repostsPage++;
              if (ionInfinite !== null) ionInfinite.complete();
          } else {
              this.repostsPage = 1;
              if (ionInfinite !== null) ionInfinite.complete();
          }
        }
      );
  }
  followUser() {
      this.latteService.followUser(this.user.id).then(res => {
         this.user.followers++;
         this.user.user_following = res;
      });
  }
  unfollowUser() {
      this.latteService.unfollowUser(this.user.id).then(res => {
          this.user.followers--;
         this.user.user_following = !res;
      });
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
