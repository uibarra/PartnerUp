import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { ChooseClassesPage } from '../choose-classes/choose-classes'

@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {
  course:string;
  dept:string;
  options: FirebaseListObservable<any>;

  constructor(public nav: NavController, public params: NavParams, angFire: AngularFire) {
    this.dept = params.get('dept')
    this.course = params.get('course');
    this.options = angFire.database.list('/department/' + this.dept + '/' + this.course);
  }

  optionSelected(option) {
    this.nav.push(ChooseClassesPage, {
      course: this.course,
      instructor: option.Instructor,

    });
  }

}
