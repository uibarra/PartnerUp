import { Component } from '@angular/core';
import { NavController, AlertController, ViewController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ClassesPage } from '../classes/classes';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})

export class SearchPage {
  depts: FirebaseListObservable<any[]>;
  uid:string

  constructor(
    public nav: NavController, private view: ViewController, public alertCtrl: AlertController,
    public params: NavParams, angFire: AngularFire) {

    this.view = view;
    this.uid = this.params.get('uid');
    this.depts = angFire.database.list('/departments/deparments');
  }

  deptSelected(dept) {
    this.nav.push(ClassesPage, {
      uid: this.uid,
      dept: dept.$value,
     });
  }

}
