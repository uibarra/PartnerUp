import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StudyInvitePage } from '../study-invite/study-invite';
import { GroupInvitePage } from '../group-invite/group-invite';

/*
  Generated class for the Notifications page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {

  constructor(public nav: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  studyInvite(){
    this.nav.push(StudyInvitePage);
  }

  groupInvite(){
    this.nav.push(GroupInvitePage);
  }

}
