import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ClassesPage } from '../classes/classes';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  depts: FirebaseListObservable<any[]>;

  constructor(public nav: NavController, public alertCtrl: AlertController, angFire: AngularFire) {
    this.depts = angFire.database.list('/departments/deparments');
  }

  deptSelected(dept) {
    this.nav.push(ClassesPage, {
      dept: dept.$value
    });
  }
}
