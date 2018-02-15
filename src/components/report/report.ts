import { Component } from '@angular/core';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { NavParams, ViewController, ToastController } from 'ionic-angular';

/**
 * Generated class for the ReportComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'report',
  templateUrl: 'report.html'
})
export class ReportComponent {
  public type : string;
  public id : number;
  public reportText : string = '';
  public video : any = {};
  public comment : any = {
      user: {
          id: 0,
          avatar: '',
          full_name: ''
      },
      comment: ''
  };
  constructor(public viewCtrl: ViewController, public navParams: NavParams, public latteService: LatteServiceProvider, public toastCtrl: ToastController) {
      this.type = navParams.get('type');
      this.id = navParams.get('id');
      this.start();
  }
  start() {
      if (this.type == "comment") {
          this.latteService.getComment(this.id).then(data => {
             this.comment = data;
             console.log(this.comment);
          });
      }
      if (this.type == "video") {
          this.latteService.getVideo(this.id).then(data => {
             this.video = data;
          });
      }
  }
  submitReport() {
      this.latteService.sendReport(this.type, this.id, this.reportText).then(data => {
          if (data) {
              this.toastCtrl.create({
                message: 'Report was send successfully',
                duration: 3000,
                position: 'bottom'
            }).present();
            this.dismiss();
          }
      });
  }
  dismiss() {
      this.viewCtrl.dismiss();
  }

}
