import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-class-groups',
  templateUrl: 'class-groups.html'
})

export class ClassGroupsPage {

  courseID:string;
  groups: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.courseID = navParams.get('courseID');
    this.groups = angFire.database.list('/groups/' + this.courseID);
    console.log(this.courseID);
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ClassGroupsPage');
  // }

  showGroup(group) {

  }

}
