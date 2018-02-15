import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('myNav') nav: NavController
  constructor(public navCtrl: NavController,
       private http: HttpClient,
       private storage: Storage,
       public latteService: LatteServiceProvider) {
  }
  public videos : any = [];
  public page: number = 1;
  public noMoreVideos : boolean = false;
  ionViewWillEnter() {
      this.latteService.isLoggedIn().then(res => {
          if (!res) {
              this.navCtrl.push(LoginPage);
          } else {
              this.videos = [];
              this.page = 1;
              this.getVideos();
          }
      });
  }
  ionViewWillLeave() {
      this.videos = [];
      this.noMoreVideos = false;
      (<any>document.querySelectorAll("video")).forEach(function(video) {
         video.pause();
         video.remove();
      });
  }
  ionSelected(){
    this.videos = [];
    this.noMoreVideos = false;
    this.page = 1;
    this.getVideos();
  }
  getVideos(ionInfinite=null) {
      return new Promise(done => {
          this.latteService.getVideos(this.page)
         .then(res => {
              if (res) {
                  this.videos = this.videos.concat((<any>Object).values(res));
                  this.page++;
                  if (ionInfinite !== null) ionInfinite.complete();
              } else {
                  this.noMoreVideos = true;
                  if (ionInfinite !== null) ionInfinite.complete();
              }
              done(true);
            }
          );
      })
  }
  doRefresh(refresher) {
      this.videos = [];
      this.noMoreVideos = false;
      this.page = 1;
      this.getVideos().then(res => {
          refresher.complete();
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
              video.pause(); // can't hurt
          }
      });
  }

}
