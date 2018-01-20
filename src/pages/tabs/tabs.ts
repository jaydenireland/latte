import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ExplorePage } from '../explore/explore';
import { CreatePage } from '../create/create';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = CreatePage;
  tab4Root = ExplorePage;
  tab5Root = ProfilePage;
  constructor() {
      
  }
}
