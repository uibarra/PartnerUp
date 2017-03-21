import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';


@Component({
  selector: 'page-study-invite',
  templateUrl: 'study-invite.html'
})

export class StudyInvitePage {

  loggedInUser: any;
  loggedInUserID: any;
  userStudyInvites: FirebaseListObservable<any>;

  constructor(public nav: NavController, public params: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.loggedInUser = firebase.auth().currentUser;
	this.loggedInUserID = this.loggedInUser.uid;
    this.userStudyInvites = angFire.database.list('/userProfile/' + this.loggedInUserID + '/studyInviteList');
  }

  acceptStudyInvite(){

  }

  removeStudyInvite(inviteID){
    let confirm = this.alertCtrl.create({
      title: 'Remove Invite',
      message: 'Are you sure you want to remove this Invite?',
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
            this.userStudyInvites.remove(inviteID);
          }
        }
      ]
    });

    confirm.present();
  }

}
