import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})
export class CreatePage {
  constructor(public navCtrl: NavController, public cameraPreview: CameraPreview) {}
  ionViewWillLeave() {
    this.cameraPreview.stopCamera();
  }
  ionViewWillEnter() {
      // camera options (Size and location).
      //In the following example, the preview uses the rear camera and display the preview in the back of the webview
    const cameraPreviewOpts: CameraPreviewOptions = {
      x: 0,
      y: 0,
      width: window.screen.width,
      height: window.screen.width,
      camera: 'rear',
      tapPhoto: true,
      previewDrag: false,
      toBack: false,
      alpha: 1
    };

    // start camera
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
  }
  switchCamera() {
      this.cameraPreview.switchCamera();
  }
  startRecording() {
      return;
  }
}
