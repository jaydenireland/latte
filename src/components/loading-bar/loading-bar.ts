import { Component, Input } from '@angular/core';

/**
 * Generated class for the LoadingBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'loading-bar',
  templateUrl: 'loading-bar.html'
})
export class LoadingBarComponent {

  @Input('progress') progress;

  constructor() {
  }

}
