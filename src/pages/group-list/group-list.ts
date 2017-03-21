import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

import { CreateGroupPage } from '../create-group/create-group';


export class Group {
  public active: boolean;
  public activeString: string;
  public count: number;
  public description: string;
  public key: string;
  public name: string;

  setActiveString(bool) {
    if (bool) {
      this.activeString = "Yes";
    } else {
      this.activeString = "No";
    }
  }
}

@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html'
})
export class GroupListPage {

  af: any;
  user: any;
  uid: any;
  classID: any;
  groups: Array<Group>;
  groupIDs: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, af: AngularFire) {

    this.af = af;
    this.user = firebase.auth().currentUser;
    this.uid = this.user.uid;
    this.classID = this.navParams.get('classID');
    this.groups = new Array;

    this.groupIDs = af.database.list(
      '/userProfile/' + this.uid + '/groupsList/' + this.classID,
      { preserveSnapshot: true }
    );
  }

  ionViewWillEnter() {
    this.groups = new Array;

    this.groupIDs
      .subscribe(groups => {
        groups.forEach(group => {
          let groupObj = new Group();
          groupObj.key = group.key;

          let query = this.af.database.list('/groups/' + group.key,
            { preserveSnapshot: true }
          );
          query.subscribe(group => {
            group.forEach(feature => {
              if (feature.key == "active") {
                groupObj.active = feature.val();
                groupObj.setActiveString(groupObj.active);
              } else if (feature.key == "count") {
                groupObj.count = feature.val();
              } else if (feature.key == "name") {
                groupObj.name = feature.val();
              }
            })
          })

          this.groups.push(groupObj);

        })
      });
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
