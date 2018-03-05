import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { MediaCapture, MediaFile, CaptureError, CaptureVideoOptions } from '@ionic-native/media-capture';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { ViewPage } from '../view/view';
@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  public debugString : any = {
      cdn : '',
      api: ''
  };
  public progress : number = 0;
  public video : any = {
      public_location: '',
      caption: ''
  };
  constructor(public navCtrl: NavController, private camera: Camera, public mediaCaptureCtrl: MediaCapture, public latteService: LatteServiceProvider) {
  }
  upload() {
      var url = `https://api.cloudinary.com/v1_1/latte/upload`;
      var xhr = new XMLHttpRequest();
      var fd = new FormData();
      xhr.open('POST', url, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.onreadystatechange = (e) => {
          if (xhr.readyState == 4 && xhr.status == 200) {
              // File uploaded successfully
              this.debugString.cdn = xhr.responseText;
              var response = JSON.parse(xhr.responseText);
              // https://res.cloudinary.com/cloudName/image/upload/v1483481128/public_id.jpg
              this.video.public_location = response.secure_url;
              this._submitUpload();
          }
      };
      fd.append('upload_preset', 'o2vgyd03');

      fd.append('tags', 'beta_upload'); // Optional - add tag for image admin in Cloudinary
      var input = (<any>document).querySelector('input[type=file]');
      var file = input.files[0];

      fd.append('file', file);
      xhr.upload.addEventListener("progress", (e) => {
          this.progress = Math.round((e.loaded * 100.0) / e.total);
      });
      xhr.send(fd);
  }
  _submitUpload() {
      this.latteService.uploadVideo(this.video.public_location, this.video.caption).then((res : any) => {
          this.navCtrl.push(ViewPage, {
              postID: res.data.id
          });
      });
  }
}
