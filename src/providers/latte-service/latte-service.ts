import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the LatteServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LatteServiceProvider {
  public oauth_token : string = '';
  public api_base : string;
  public user : any = {};
  constructor(public http: HttpClient,  private storage: Storage) {
    this.api_base = "https://videos-api.jaydenireland.com";
    this.getVars();
  }
  getVars() {
      return new Promise(resolve => {
          this.storage.get('oauth_token').then(val => {
              if (val) {
                  this.oauth_token = val;
              }
              this.storage.get('user').then(val_user => {
                  if (val) {
                      this.user = val_user;
                  }
                  resolve(this.user);
              });
          });
      })

  }
  whoAmI(promise=true) {
      let thePromise = null;

      if (promise) {
          thePromise = new Promise(resolve => {
              this.http.post(`${this.api_base}/users/whoAmI`,
              `oauth_token=${this.oauth_token}`,
              {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
              .subscribe((res : any) => {
                  if (res) {
                      this.user = res.data;
                      resolve(res.data);
                  } else {
                      resolve(false);
                  }
              });
          });
      }

      return {
          'user' : this.user,
          'promise': thePromise
      };
  }
  isLoggedIn() {
      return new Promise(resolve => {
          this.getVars().then(res => {
              resolve(this.oauth_token)
          });
      })

  }
  getFollowers(userID) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/followers/followers`,
          `oauth_token=${this.oauth_token}&user_id=${userID}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  getFollowing(userID) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/followers/following`,
          `oauth_token=${this.oauth_token}&user_id=${userID}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  getUser(userID=null) {
      if (userID == null) {
          return new Promise(resolve => {
              this.getProfile(this.user.id).then(res => {
                  resolve(res);
              });
              // this.getVars().then(res => {
              //     resolve(this.user);
              // });
          })
      }
  }
  login(username, password) {
        return new Promise(resolve => {
            this.http.post(`${this.api_base}/users/login`,
            `username=${username}&password=${password}`,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .subscribe((res : any) => {
                this.oauth_token = res.oauth_token;
                this.user = res.user;
                this.storage.set('oauth_token', res.oauth_token);
                this.storage.set('user', res.user);
                resolve(res.success);
            });
        });
  }
  searchUsers(query, page=0) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/users/search?page=${page}&limit=10`,
          `oauth_token=${this.oauth_token}&query=${query}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  createAccount(username, password, first_name, last_name, avatar="https://res.cloudinary.com/latte/image/upload/v1517766124/uDlDuIm_i5jglj.jpg") {
        return new Promise(resolve => {
            this.http.post(`${this.api_base}/users/add`,
            `username=${username}&password=${password}&first_name=${first_name}&last_name=${last_name}&avatar=${avatar}`,
            {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .subscribe((res : any) => {
                resolve(res.success);
            });
        });
  }
  getVideo(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videos/get`,
          `oauth_token=${this.oauth_token}&id=${id}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res.data);
          });
      });
  }
  deleteVideo(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videos/delete`,
          `oauth_token=${this.oauth_token}&id=${id}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res.success);
          });
      });
  }
  getVideos(page=0, limit=5) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videos/feed?limit=${limit}&page=${page}`,
          `oauth_token=${this.oauth_token}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  getProfile(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/users/getUser/${id}`,
          `oauth_token=${this.oauth_token}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  getMyVideos(page=0, limit=5) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videos/me?limit=${limit}&page=${page}`,
          `oauth_token=${this.oauth_token}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  getUserVideos(userID, page=0, limit=5) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videos/user/${userID}?limit=${limit}&page=${page}`,
          `oauth_token=${this.oauth_token}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.data);
              } else {
                  resolve(false);
              }
          });
      });
  }
  likeVideo(videoID) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videoLikes/add`,
          `oauth_token=${this.oauth_token}&video_id=${videoID}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.total);
              } else {
                  resolve(false);
              }
          });
      });
  }
  unlikeVideo(videoID) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/videoLikes/delete`,
          `oauth_token=${this.oauth_token}&video_id=${videoID}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res) {
                  resolve(res.total);
              } else {
                  resolve(false);
              }
          });
      });
  }
  followUser(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/followers/follow`,
          `oauth_token=${this.oauth_token}&following_id=${id}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res);
          });
      });
  }
  unfollowUser(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/followers/unfollow`,
          `oauth_token=${this.oauth_token}&following_id=${id}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res);
          });
      });
  }
  getComment(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/VideoComments/get`,
          `oauth_token=${this.oauth_token}&id=${id}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              if (res.success) {
                  resolve(res.data);
              } else {
                  resolve(false)
              }

          });
      });
  }
  addComment(video_id, text) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/VideoComments/add`,
          `oauth_token=${this.oauth_token}&video_id=${video_id}&comment=${text}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res.data);
          });
      });
  }
  removeComment(id) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/VideoComments/delete`,
          `oauth_token=${this.oauth_token}&id=${id}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res.success);
          });
      });
  }
  getExplore() {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/pages/explore`,
          `oauth_token=${this.oauth_token}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res.data);
          });
      })
  }
  sendReport(type,item_id,text) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/Reports/add`,
          `oauth_token=${this.oauth_token}&type=${type}&item_id=${item_id}&text=${text}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res : any) => {
              resolve(res.success);
          });
      });
  }
  editProfile(first_name, last_name) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/Users/edit`,
          `oauth_token=${this.oauth_token}&first_name=${first_name}&last_name=${last_name}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res: any) => {
             resolve(res.success);
          });
      })
  }
  uploadVideo(location, caption) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/Videos/upload`,
          `oauth_token=${this.oauth_token}&location=${location}&caption=${caption}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res: any) => {
             resolve(res);
          });
      });
  }
  getUserID(username) {
      return new Promise(resolve => {
          this.http.post(`${this.api_base}/Users/findByUsername`,
          `oauth_token=${this.oauth_token}&username=${username}`,
          {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .subscribe((res: any) => {
             resolve(res);
          });
      });
  }
}
