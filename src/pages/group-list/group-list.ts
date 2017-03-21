import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

import { CreateGroupPage } from '../create-group/create-group';

@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html'
})
export class GroupListPage {

  user: any;
  uid: any;
  classID: any;
  groups: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, angFire: AngularFire) {
    this.user = firebase.auth().currentUser;
    this.uid = this.user.uid;
    this.classID = this.navParams.get('classID');
    this.groups = angFire.database.list('/userProfile/' + this.uid + '/groupsList');
  }

  groupSelected(groupID) {
    // this.nav.push(ViewGroupPage, {
    //   classID: this.classID,
    //   groupID: groupID
    // });
  }

  createGroup(groupID) {
    this.nav.push(CreateGroupPage, {
      uid: this.uid,
      classID: this.classID,
     });
  }

}
