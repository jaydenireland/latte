import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { UserPage } from '../../pages/user/user';
import { NavController } from 'ionic-angular';
import { ReportComponent } from '../report/report';
import { ModalController, NavParams, ToastController, AlertController } from 'ionic-angular';


/**
 * Generated class for the VideoPostComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'video-post',
  templateUrl: 'video-post.html'
})
export class VideoPostComponent {
  public currentUser : any;
  public commentText : string = '';
  public showMore : boolean = false;
  @Input('video') video;
  @Input('onlyVideo') onlyVideo;
  constructor(
      public latteService: LatteServiceProvider,
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController) {
      let tempCall = latteService.whoAmI(false);
      this.currentUser = tempCall.user;
  }
  reportComment(comment_id) {
      let modal = this.modalCtrl.create(ReportComponent, {
          id: comment_id,
          type: 'comment'
      });
      modal.present();
  }
  reportVideo() {
      let modal = this.modalCtrl.create(ReportComponent, {
          id: this.video.id,
          type: 'video'
      });
      modal.present();
  }
  deleteVideo() {
      this.alertCtrl.create({
        title: 'Confirm deletion',
        message: 'Do you want to delete this post?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              this.deleteVideoReal()
            }
          }
        ]
    }).present();
  }
  deleteVideoReal() {
      this.latteService.deleteVideo(this.video.id).then(res => {
         if (res) {
             this.video = false;
             this.toastCtrl.create({
               message: 'Video was deleted successfully',
               duration: 3000,
               position: 'bottom'
           }).present();
         }
      });
  }
  clickVideo(event) {
      if (event.target.paused) {
         event.target.play();
     } else {
         event.target.pause();
     }
  }
  openUser(userID) {
      this.navCtrl.push(UserPage, {
          userID: userID,
      });
  }
  likeVideo(videoID) {
      if (!this.video.hasLiked) {
          this.latteService.likeVideo(videoID).then(res => {
             if (typeof this.video.video_likes[0] == 'undefined') {
                 this.video.video_likes.push({total: res});
             } else {
                 this.video.video_likes[0].total = res;
             }
             this.video.hasLiked = true;
          });
      } else {
          this.latteService.unlikeVideo(videoID).then(res => {
              if (typeof this.video.video_likes[0] == 'undefined') {
                  this.video.video_likes.push({total: res});
              } else {
                  this.video.video_likes[0].total = res;
              }
              this.video.hasLiked = false;
          });
      }
  }
  addComment() {
      if (this.commentText.length >= 1) {
          this.latteService.addComment(this.video.id, this.commentText).then(res => {
              if (res) {
                  this.video.video_comments.unshift(res);
                  this.commentText = '';
              }
          });
      }
  }
  deleteComment(id) {
      this.alertCtrl.create({
        title: 'Confirm deletion',
        message: 'Do you want to delete this comment?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel'
          },
          {
            text: 'Delete',
            handler: () => {
              this.deleteCommentReal(id)
            }
          }
        ]
    }).present();
  }
  deleteCommentReal(id) {
      this.latteService.removeComment(id).then(res => {
          for (var i = this.video.video_comments.length - 1; i >= 0; --i) {
            if (this.video.video_comments[i].id == id) {
                this.video.video_comments.splice(i,1);
            }
         }
      });
  }

}
