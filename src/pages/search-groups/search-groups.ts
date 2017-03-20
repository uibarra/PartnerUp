import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SearchPage } from '../search/search';
import firebase from 'firebase';

@Component({
  selector: 'page-search-groups',
  templateUrl: 'search-groups.html'
})

export class SearchGroupsPage {

   loggedInUser: any;
   loggedInUserID: any;
   courses: FirebaseListObservable<any>;
   groups: FirebaseListObservable<any>;

    constructor(
     public nav: NavController, public alertCtrl: AlertController,
     public params: NavParams, angFire: AngularFire) {

    	this.loggedInUser = firebase.auth().currentUser;
    	this.loggedInUserID = this.loggedInUser.uid;
      this.courses = angFire.database.list('/userProfile/' + this.loggedInUserID + '/classesList');
    }

    courseSelected(course) {

    }
}
