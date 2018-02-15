import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CameraPreview, CameraPreviewOptions } from '@ionic-native/camera-preview';

@Component({
  selector: 'page-create',
  templateUrl: 'about.html'
})
export class CreatePage {
  constructor(public navCtrl: NavController, public cameraPreview: CameraPreview) {}
}
