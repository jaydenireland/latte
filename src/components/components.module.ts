import { NgModule } from '@angular/core';
import { VideoPostComponent } from './video-post/video-post';
import { FollowListComponent } from './follow-list/follow-list';
import { ReportComponent } from './report/report';
@NgModule({
	declarations: [VideoPostComponent,
    FollowListComponent,
    ReportComponent],
	imports: [],
	exports: [VideoPostComponent,
    FollowListComponent,
    ReportComponent]
})
export class ComponentsModule {}
