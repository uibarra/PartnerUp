import { Component } from '@angular/core';
import { NavController, AlertController, ModalController } from 'ionic-angular';
import { AngularFire } from 'angularfire2';
import { ChooseClassesPage } from '../choose-classes/choose-classes';
import { ViewSelectedMajorsModal } from '../edit-classes/view-selected-majors'; //be careful of the directory difference here and in app.module
import firebase from 'firebase';

//THIS IS THE CONTROLLER BRO!!!!

@Component({
  selector: 'page-edit-classes',
  templateUrl: 'edit-classes.html'
})

export class ChooseMajorsPage {

  depts: any;
  selected: any;
  public loggedInUser: any;

  constructor(public nav: NavController, public alertCtrl: AlertController, angFire: AngularFire, public modalCtrl: ModalController) {

    var ref = firebase.database().ref('/departments');

    this.selected = [];
    this.loggedInUser = firebase.auth().currentUser;

    ref.on('value', (data) => {
        var departments = data.val()['deparments'];
        this.depts = departments;
    });
  }

  clicked(dept){

    var index = this.selected.indexOf(dept);
    if (index > -1) {
        this.selected.splice(index, 1);
    } else {
        this.selected.push(dept);
    }
  }

  //the dept that is passed here has to be an array!!!
  majorsSelected(dept) {
    this.nav.push(ChooseClassesPage, {
      dept: dept.$value
    });
  }

presentSelectedMajorsModal() {

      //pass in the selected majors for viewing
     let selectedMajorsModal = this.modalCtrl.create(ViewSelectedMajorsModal, {"params" : this.selected});
     selectedMajorsModal.present();
 }

}