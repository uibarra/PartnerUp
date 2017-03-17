import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';


@Component({
  selector: 'page-choose-classes',
  templateUrl: 'choose-classes.html'
})

export class ChooseClassesPage {

  constructor(public nav: NavController, public alertCtrl: AlertController, angFire: AngularFire) {


  }


}