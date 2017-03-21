import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

import { CreateGroupPage } from '../create-group/create-group';
import { Subject } from 'rxjs/Subject';
//import 'rxjs/add/operator/mergeMap';
//import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';



export class Group {
  constructor(
    public active: boolean,
    public count: number,
    //public course: string,
    public description: string,
    //public leader: string,
    //public location: string,
    //public members: Array<string>,
    public name: string,
    //public public: boolean,
    //public rating: number
  ){}
}

@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html'
})
export class GroupListPage {

  user: any;
  uid: any;
  classID: any;
  subject: Subject<any>;
  groups: FirebaseListObservable<any>;;
  groupIDs: FirebaseListObservable<any>;
  groupQuery: FirebaseListObservable<any>;

  constructor(public nav: NavController, public navParams: NavParams,
    public modalCtrl: ModalController, af: AngularFire) {
    this.user = firebase.auth().currentUser;
    this.uid = this.user.uid;
    this.classID = this.navParams.get('classID');

    this.subject = new Subject();
    this.groupQuery = af.database.list('/groups/', {
      query: { equalTo: this.subject }
    });

    this.groupIDs = af.database.list(
      '/userProfile/' + this.uid + '/groupsList/' + this.classID,
      { preserveSnapshot: true }
    );

    let groupIDArr: Array<any>;
    this.groupIDs
      .subscribe(snapshots => {
        snapshots.forEach(snapshot => {
          //this.subject.next(snapshot.key);
          //let groupObj = new Group();
          // this.groupQuery.subscribe(groups => {
          //   groups.forEach(group => {
          //     let groupObj = new Group(group.active, group.count, group.description, group.name)
          //     this.groups.push(groupObj);
          //   });
          // });
          let stringID: string = snapshot.key
          //groupIDArr.push(snapshot.key);
          console.log(snapshot.key);
        })
      });

      for (let ID of groupIDArr) {
        this.groups = af.database.list('/groups/', {
          query: { equalTo: ID }
        });
      }
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
