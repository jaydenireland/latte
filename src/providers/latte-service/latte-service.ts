import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Api } from '../api/api';

/*
  Generated class for the LatteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LatteServiceProvider {
  public jwt : string = "";
  public user : any = {};
  constructor(public api : Api,  private storage: Storage) {
  }
  whoAmI() {
     let seq = this.api.get('users/me');
     seq.subscribe((res : any) => {
        this.user = res.result.user;
     });
     return this.user;
  }
  isLoggedIn() {
      let seq = this.api.get('users/status');
      return new Promise(resolve => {
          seq.subscribe(
              (data : any) => resolve(data),
              (error : any) => resolve(false)
            );
      });
  }
  getFollowers(userID) {
     let seq = this.api.get('followers/followers/' + userID);
     return new Promise(resolve => {
         seq.subscribe(
             (data : any) => resolve(data.result.users),
             (error : any) => resolve(false)
           );
     });
  }
  getFollowing(userID) {
      let seq = this.api.get('followers/following/' + userID);
      return new Promise(resolve => {
          seq.subscribe(
              (data : any) => resolve(data.result.users),
              (error : any) => resolve(false)
            );
      });
  }
  login(username, password) {
      let seq = this.api.post('users/login', {username, password});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  this.api.jwt = res.result.token;
                  let user = res.result.token.split('.');
                  this.user = JSON.parse(atob(user[1]));
                  resolve(true);
              }
              resolve(false);
          });
      });
  }
  searchUsers(query, page=0) {
     let seq = this.api.post("users/search", {query, page})
     return new Promise(resolve => {
         seq.subscribe(
             (data : any) => resolve(data.result.users),
             (error : any) => resolve(false)
           );
       });
  }
  createAccount(username, password, first_name, last_name, avatar="https://res.cloudinary.com/latte/image/upload/v1517766124/uDlDuIm_i5jglj.jpg") {
     let seq = this.api.post("users/register", {username, password, first_name, last_name, avatar});
     return new Promise(resolve => {
         seq.subscribe((res : any) => {
             if (res.status === "OK") {
                 this.api.jwt = res.result.token;
                 let user = res.result.token.split('.');
                 this.user = JSON.parse(atob(user[1]));
                 resolve(true);
             }
             resolve(false);
         });
     });

  }
  getVideo(id) {
     let seq = this.api.get("videos/get/" + id);
     return new Promise(resolve => {
         seq.subscribe(
             (data : any) => resolve(data.result.data),
             (error : any) => resolve(false)
           );
     });

  }
  deleteVideo(id) {
     let seq = this.api.post("videos/delete/"+id, {});
     return new Promise(resolve => {
         seq.subscribe(
             (data : any) => resolve(data.status === "OK"),
             (error : any) => resolve(false)
           );
     });
  }
  getVideos(page=0, limit=5) {
      let seq = this.api.get('videos/feed', {page, limit});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.data);
              }
              resolve(false);
          });
      });

  }
  getProfile(id) {
     let seq = this.api.get('users/user/'+id);
     return new Promise(resolve => {
         seq.subscribe((res : any) => {
             if (res.status === "OK") {
                 resolve(res.result.user);
             }
             resolve(false);
         });
     });
  }
  getMyVideos(page=0, limit=5) {
      let seq = this.api.get('videos/me', {page, limit});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.data);
              }
              resolve(false);
          });
      });

  }
  getUserVideos(userID, page=0, limit=5) {
      let seq = this.api.get('videos/user/'+userID, {page, limit});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.data);
              }
              resolve(false);
          });
      });
  }
  getUserReposts(userID, page=0, limit=5) {
      let seq = this.api.get('reposts/view/'+userID, {page, limit});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.data);
              }
              resolve(false);
          });
      });
  }
  likeVideo(videoID) {
      let seq = this.api.post('videos/likeVideo/'+videoID, {});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.total);
              }
              resolve(false);
          });
      });

  }
  unlikeVideo(videoID) {
      let seq = this.api.post('videos/unlikeVideo/'+videoID, {});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.total);
              }
              resolve(false);
          });
      });
  }
  followUser(id) {
     let seq = this.api.post("followers/follow/"+id, {});
     return new Promise(resolve => {
         seq.subscribe(
             (data : any) => resolve(data.status === "OK"),
             (error : any) => resolve(false)
           );
     });

  }
  unfollowUser(id) {
    let seq = this.api.post("followers/unfollow/"+id, {});
    return new Promise(resolve => {
        seq.subscribe(
            (data : any) => resolve(data.status === "OK"),
            (error : any) => resolve(false)
            );
    });

  }
  getComment(id) {
      let seq = this.api.get("VideoComments/get/"+id);
      return new Promise(resolve => {
          seq.subscribe(
              (data : any) => resolve(data.data.data),
              (error : any) => resolve(false)
              );
      });
  }
  addComment(video_id, comment) {
     let seq = this.api.post("VideoComments/add/"+video_id, {comment});
     return new Promise(resolve => {
         seq.subscribe(
             (data : any) => resolve(data.status === "OK"),
             (error : any) => resolve(false)
             );
     });
  }
  removeComment(id) {
      let seq = this.api.delete("VideoComments/delete/"+id);
      return new Promise(resolve => {
          seq.subscribe(
              (data : any) => resolve(data.status === "OK"),
              (error : any) => resolve(false)
              );
      });
  }
  getExplore() {
     return new Promise(resolve => {
         resolve(false);
     });
  }
  sendReport(type,item_id,text) {
      let seq = this.api.post("Reports/add", {type, item_id, text});
      return new Promise(resolve => {
          seq.subscribe(
              (data : any) => resolve(data.status === "OK"),
              (error : any) => resolve(false)
              );
      });
  }
  editProfile(first_name, last_name) {
      let seq = this.api.post('users/edit', {first_name, last_name});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.user);
              }
              resolve(false);
          });
      });

  }
  uploadVideo(location, caption) {
      let seq = this.api.post('videos/upload', {location, caption});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result);
              }
              resolve(false);
          });
      });

  }
  getUserID(username) {
      return new Promise(resolve => {
          this.getUserByUsername(username).then((res : any) => resolve(res.id));
      });
  }
  getUserByUsername(username) {
      let seq = this.api.get('users/getUser/'+username);
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result.data);
              }
              resolve(false);
          });
      });
  }
  repostVideo(video_id) {
      let seq = this.api.post('reposts/add/'+video_id, {});
      return new Promise(resolve => {
          seq.subscribe((res: any) => {
              if (res.status === "OK") {
                  resolve(res.result);
              }
              resolve(false);
          });
      });
  }

}
