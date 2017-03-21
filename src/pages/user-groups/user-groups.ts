import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

import { GroupListPage } from '../group-list/group-list';

@Component({
  selector: 'page-user-groups',
  templateUrl: 'user-groups.html'
})
export class UserGroupsPage {

  user: any;
  uid: any;
  classes: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.user = firebase.auth().currentUser;
    this.uid = this.user.uid;
    this.classes = angFire.database.list('/userProfile/' + this.uid + '/classesList');
  }

  classSelected(classID) {
    this.nav.push(GroupListPage, {classID: classID});
  }

}
