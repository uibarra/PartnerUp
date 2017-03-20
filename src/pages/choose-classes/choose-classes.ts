import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { SearchPage } from '../search/search';
import firebase from 'firebase';

@Component({
  selector: 'page-choose-classes',
  templateUrl: 'choose-classes.html'
})

export class ChooseClassesPage {

	depts: any;
  	public loggedInUser: any;
  	public loggedInUserID: any;
    classes: FirebaseListObservable<any>;

  	constructor(
      public nav: NavController, public alertCtrl: AlertController,
      public params: NavParams, angFire: AngularFire) {

    	this.loggedInUser = firebase.auth().currentUser;
    	this.loggedInUserID = this.loggedInUser.uid;
      this.classes = angFire.database.list('/userProfile/' + this.loggedInUserID + '/classesList');
  	}

    addClass(){
        this.nav.push(SearchPage, {
          uid: this.loggedInUserID,
        })
    }

    removeClass(classID){
      let confirm = this.alertCtrl.create({
        title: 'Remove Class',
        message: 'Are you sure you want to remove this class?',
        buttons: [
          {
            text: 'Cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              console.log('Confirm clicked');
              this.classes.remove(classID);
            }
          }
        ]
      });

      confirm.present();
    }

}
