import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage} from '../map/map'

@Component({
  selector: 'menu-page',
  templateUrl: 'menu.html'
})
export class MenuPage {

  constructor(public navCtrl: NavController) {

  }

  public getMap() {
    this.navCtrl.push(MapPage);
  }
}
