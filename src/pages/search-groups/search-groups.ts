import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SearchPage } from '../search/search';
import { ClassGroupsPage } from '../class-groups/class-groups';
import firebase from 'firebase';

export class Group {
  public active: boolean;
  public activeString: string;
  public count: number;
  public description: string;
  public key: string;
  public name: string;

  public locationX: number;
  public locationY: number;
  public rating: number;

  setActiveString(bool) {
    if (bool) {
      this.activeString = "Yes";
    } else {
      this.activeString = "No";
    }
  }
}

@Component({
  selector: 'page-search-groups',
  templateUrl: 'search-groups.html'
})

export class SearchGroupsPage {

   loggedInUser: any;
   loggedInUserID: any;
   courses: FirebaseListObservable<any>;
   angFire: any;

    constructor(
     public nav: NavController, public alertCtrl: AlertController,
     public params: NavParams, angFire: AngularFire) {

      this.angFire = angFire;
    	this.loggedInUser = firebase.auth().currentUser;
    	this.loggedInUserID = this.loggedInUser.uid;
      this.courses = this.angFire.database.list('/userProfile/' + this.loggedInUserID + '/classesList');
    }

    showCourseGroups(courseID) {
      console.log(courseID, "this is the course id search-groupsts");
      this.nav.push(ClassGroupsPage, {courseID: courseID});
    }

     ionViewWillEnter() {
       
     }
}
