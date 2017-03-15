import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {
  options: FirebaseListObservable<any>;

  constructor(public nav: NavController, public params: NavParams, angFire: AngularFire) {
    this.options = angFire.database.list('/department/' + params.get('dept') + '/' + params.get('course'));
  }

  optionSelected(option) {
    // this.nav.push(ClassesPage, {
    //   dept: dept.$key
    // });
  }

}
