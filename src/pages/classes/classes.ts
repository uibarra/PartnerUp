import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ChooseClassesPage } from '../choose-classes/choose-classes'

@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html'
})

export class ClassesPage {

  dept:string
  uid:string
  classes: FirebaseListObservable<any>;
  userClasses: FirebaseListObservable<any>;

  constructor(public nav: NavController, public params: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.uid = params.get('uid');
    this.dept = params.get('dept');
    this.classes = angFire.database.list('/department/' + this.dept);
    this.userClasses = angFire.database.list('/userProfile/' + this.uid + '/classesList');
  }

  showConfirmClass(course) {
    let confirm = this.alertCtrl.create({
      title: 'Add Class',
      message: 'Are you sure you want to add this class?',
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
            this.classSelected(course);
          }
        }
      ]
    });
    confirm.present();
  }

  classSelected(course) {
    this.userClasses.push({
      Dept: this.dept,
      Course: course.$key
    })

    let alert = this.alertCtrl.create({
      title: 'Class Added!',
      buttons: ['OK']
    });
    alert.present();
  }

}
