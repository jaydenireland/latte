import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LatteServiceProvider } from '../../providers/latte-service/latte-service';
import { UserPage } from '../user/user';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {
  public userResults : any = [];
  public searchBar : string = '';
  public page : number = 1;
  public categories : any = [];
  public exploreContent : any = '';
  constructor(public navCtrl: NavController, public latteService: LatteServiceProvider, private sanitizer: DomSanitizer) {
  }
  ionViewWillLeave() {
      this.page = 1;
  }
  ionViewWillEnter() {
      this.latteService.getExplore().then((html : any) => {
         this.exploreContent = this.sanitizer.bypassSecurityTrustHtml(html);
      });
  }
  searchUsers(ionInfinite=null) {
      if (!ionInfinite) {
          this.userResults = [];
      } else {
          this.page++;
      }
      this.latteService.searchUsers(this.searchBar, this.page).then(res => {
         this.userResults = this.userResults.concat(res);
      });
  }
  openUser(userID) {
      this.navCtrl.push(UserPage, {
          userID: userID,
      });
  }

}
