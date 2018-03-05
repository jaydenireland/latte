import { NgModule } from '@angular/core';
import { VideoPostComponent } from './video-post/video-post';
import { FollowListComponent } from './follow-list/follow-list';
import { ReportComponent } from './report/report';
import { LoadingBarComponent } from './loading-bar/loading-bar';
@NgModule({
	declarations: [VideoPostComponent,
    FollowListComponent,
    ReportComponent,
    LoadingBarComponent],
	imports: [],
	exports: [VideoPostComponent,
    FollowListComponent,
    ReportComponent,
    LoadingBarComponent]
})
export class ComponentsModule {}
