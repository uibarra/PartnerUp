import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ChooseClassesPage } from '../choose-classes/choose-classes';
import firebase from 'firebase';

@Component({
  selector: 'page-edit-classes',
  templateUrl: 'edit-classes.html'
})

export class ChooseMajorsPage {

  depts: any;
  selected: any;
  public loggedInUser: any;
  loggedInUserID: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, angFire: AngularFire, public modalCtrl: ModalController) {

    var ref = firebase.database().ref('/departments');

    this.selected = [];
    this.loggedInUser = firebase.auth().currentUser;
    this.loggedInUserID = this.loggedInUser.uid;

    ref.on('value', (data) => {
        var departments = data.val()['deparments'];
        this.depts = departments;
    });

  }

  addMajorToList(dept){

    var index = this.selected.indexOf(dept);
    if (index > -1) {
        this.selected.splice(index, 1);
    } else {
        this.selected.push(dept);
    }
  }

  saveMajorListToDataBase(){
    var ref = firebase.database().ref().child('userProfile').child(this.loggedInUserID).child("majorsList");
    ref.set(this.selected);

  }

}