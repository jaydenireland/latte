import { NgModule, ErrorHandler } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { NotificationsPage } from '../pages/notifications/notifications';
import { ExplorePage } from '../pages/explore/explore';
import { HomePage } from '../pages/home/home';
import { CreateAccountPage } from '../pages/create-account/create-account';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { UserPage } from '../pages/user/user';
import { ViewPage } from '../pages/view/view';

import { CreatePage } from '../pages/create/create';
import { LoginPage } from '../pages/login/login';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

import { LoadingBarComponent } from '../components/loading-bar/loading-bar';
import { VideoPostComponent } from '../components/video-post/video-post';
import { FollowListComponent } from '../components/follow-list/follow-list';
import { ReportComponent } from '../components/report/report';

import { Camera } from '@ionic-native/camera';
import { MediaCapture } from '@ionic-native/media-capture';
import { Base64 } from '@ionic-native/base64';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NgPipesModule} from 'ngx-pipes';
import { InViewportModule } from 'ng-in-viewport';
import { LatteServiceProvider } from '../providers/latte-service/latte-service';
import { Api } from '../providers/api/api';

@NgModule({
  declarations: [
    MyApp,
    NotificationsPage,
    ExplorePage,
    HomePage,
    ProfilePage,
    CreatePage,
    LoginPage,
    UserPage,
    ViewPage,
    EditProfilePage,
    CreateAccountPage,
    VideoPostComponent,
    LoadingBarComponent,
    FollowListComponent,
    ReportComponent,
    TabsPage
  ],
  imports: [
    BrowserModule,
    NgPipesModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationsPage,
    ExplorePage,
    ProfilePage,
    HomePage,
    ViewPage,
    CreateAccountPage,
    FollowListComponent,
    ReportComponent,
    EditProfilePage,
    UserPage,
    CreatePage,
    LoginPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    Base64,
    MediaCapture,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Api,
    LatteServiceProvider
  ]
})

export class AppModule {
    constructor() {}

}
