import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public actionsheetCtrl: ActionSheetController) {
  }

  getVideos() {
      let returnstate = [
          {
              src: 'https://videos-api.jaydenireland.com/videos/1.mp4',
              description: "My cool video #0",
              comments: [
                  {
                      user: {full_name: "test mctest", avatar: "https://via.placeholder.com/200x200"},
                      text: "blah blag blah"
                  }
              ]
          },
          {
              src: 'https://videos-api.jaydenireland.com/videos/2.mp4',
              description: "My cool video #1",
              comments: [
                  {
                      user: {full_name: "test mctest", avatar: "https://via.placeholder.com/200x200"},
                      text: "blah blag blah"
                  }
              ]
          },
          {
              src: 'https://videos-api.jaydenireland.com/videos/3.mp4',
              description: "My cool video #2",
              comments: [
                  {
                      user: {full_name: "test mctest", avatar: "https://via.placeholder.com/200x200"},
                      text: "blah blag blah"
                  }
              ]
          }
      ];
      return returnstate;
  }

}
