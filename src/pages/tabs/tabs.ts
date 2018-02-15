import { Component } from '@angular/core';

import { NotificationsPage } from '../notifications/notifications';
import { ExplorePage } from '../explore/explore';
import { CreatePage } from '../create/create';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = CreatePage;
  tab4Root = NotificationsPage;
  tab5Root = ProfilePage;
  constructor() {

  }
}
