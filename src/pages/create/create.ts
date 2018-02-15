import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { VideoCapturePlus, VideoCapturePlusOptions, MediaFile } from '@ionic-native/video-capture-plus';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  public debugString : any = {};
  constructor(public navCtrl: NavController, private camera: Camera, public videoCapturePlus: VideoCapturePlus) {}
  ionViewWillLeave() {
    // this.cameraPreview.stopCamera();
  }
  ionViewWillEnter() {
      // camera options (Size and location).
      //In the following example, the preview uses the rear camera and display the preview in the back of the webview
    // const cameraPreviewOpts: CameraPreviewOptions = {
    //   x: 0,
    //   y: 0,
    //   width: window.screen.width,
    //   height: window.screen.width,
    //   camera: 'rear',
    //   tapPhoto: true,
    //   previewDrag: false,
    //   toBack: false,
    //   alpha: 1
    // };

    // // start camera
    // this.cameraPreview.startCamera(cameraPreviewOpts).then(
    //   (res) => {
    //     console.log(res)
    //   },
    //   (err) => {
    //     console.log(err)
    //   });
  }
  switchCamera() {
      // this.cameraPreview.switchCamera();
  }
  start(){
      const options: VideoCapturePlusOptions = {
       limit: 1,
       highquality: true
       };
this.videoCapturePlus.captureVideo(options)
    // this.videoCapturePlus.captureVideo(options).then(res => {
    //     this.debugString = res;
    // }, error => console.log('Something went wrong'));
  }
}
