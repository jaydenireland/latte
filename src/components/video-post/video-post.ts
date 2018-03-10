import { Component, Input, Output, EventEmitter, ChangeDetectorRef, SecurityContext } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { UserPage } from '../../pages/user/user';
import { NavController } from 'ionic-angular';
import { ReportComponent } from '../report/report';
import { ModalController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';


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
  public editing : boolean = false;
  @Input('video') video;
  @Input('noVideo') noVideo = false;
  @Input('onlyVideo') onlyVideo;
  constructor(
      public latteService: LatteServiceProvider,
      public navCtrl: NavController,
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      private cdr: ChangeDetectorRef,
      public sanitizer: DomSanitizer,
      public alertCtrl: AlertController) {
      let tempCall = latteService.whoAmI(false);
      this.currentUser = tempCall.user;
  }
  ngAfterViewInit(){
      this.video.caption = this.sanitizer.sanitize(SecurityContext.HTML, this.video.caption);
      this.video.caption = this.strip(this.video.caption);
      this.video.caption = this.video.caption.replace(/@\w+/g, function (a) {
          return `<a data-username='${a}'>${a}</a>`;
      });
      this.video.caption = this.sanitizer.bypassSecurityTrustHtml(this.video.caption);
      this.cdr.detectChanges();
      var _this = this;
      (<any>document).querySelectorAll("[data-username]").forEach(e => {
         e.addEventListener('click', function(event) {
             var username = this.dataset['username'];
             _this.openUserByUsername(username.replace('@', ''));
             event.stopPropagation();
             event.preventDefault();
         });
      });

  }
  strip(html){
      var tmp = (<any>document).implementation.createHTMLDocument("New").body;
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
  }
  editVideo() {
     this.editing = !this.editing;
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
  openUserByUsername(username) {
      this.latteService.getUserID(username).then((res : any) => {
          if (res.success) this.openUser(res.user.id) && console.log(res);
      });
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
          this.latteService.addComment(this.video.id, this.commentText).then((res : any) => {
              if (res) {
                  this.video.video_comments.unshift(res);
                  this.commentText = '';
              }
          });
      }
  }
  repostVideo() {
      this.latteService.repostVideo(this.video.id).then((res : any) => {
          if (res.success) {
              this.toastCtrl.create({
                message: res.action,
                duration: 3000,
                position: 'bottom'
            }).present();
        } else {
            this.toastCtrl.create({
              message: 'Something went wrong',
              duration: 3000,
              position: 'bottom'
          }).present();
        }
      });
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
