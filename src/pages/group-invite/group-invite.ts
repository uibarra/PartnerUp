import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the GroupInvite page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-invite',
  templateUrl: 'group-invite.html'
})
export class GroupInvitePage {

  loggedInUser: any;
  loggedInUserID: any;
  userGroupInvites: FirebaseListObservable<any>;

  constructor(public nav: NavController, public params: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.loggedInUser = firebase.auth().currentUser;
	this.loggedInUserID = this.loggedInUser.uid;
    this.userGroupInvites = angFire.database.list('/userProfile/' + this.loggedInUserID + '/groupInviteList');
  }

  acceptGroupInvite(){

  }

  removeGroupInvite(inviteID){
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
            this.userGroupInvites.remove(inviteID);
          }
        }
      ]
    });

    confirm.present();
  }

}
