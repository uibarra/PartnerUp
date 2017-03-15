import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { OptionsPage } from '../options/options';


@Component({
  selector: 'page-classes',
  templateUrl: 'classes.html'
})

export class ClassesPage {
  
  classes: FirebaseListObservable<any>;

  constructor(public nav: NavController, public params: NavParams, public alertCtrl: AlertController, angFire: AngularFire) {
    this.classes = angFire.database.list('/department/' + params.get('dept'));
  }

  classSelected(course) {
    // this.classes.subscribe(
    // classes => {
    //     classes.map(course =>
    //         instructors.push(course)
    //     )
    // });


    this.nav.push(OptionsPage, {
      dept : this.params.get('dept'),
      course: course.$key
    });
  }

}
