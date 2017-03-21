import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

 import { Events } from 'ionic/angular2';


@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html'
})
export class CreateGroupPage {
  private uid: string;
  private classID: string;
  public createForm: FormGroup;
  private groups: FirebaseListObservable<any>;
  private groupByClass: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams, private formBuilder: FormBuilder, angFire: AngularFire) {
    this.uid = navParams.get('uid');
    this.classID = navParams.get('classID');

    this.createForm = this.formBuilder.group({
      name:['', Validators.required],
      description: [''],
      public: [true]
    });

    //this.groups = angFire.database.list('/groups/' + this.classID);
    this.groups = angFire.database.list('/groups/');
    this.groupByClass = angFire.database.list(this.classID);

  }

  create() {
    let formInfo = this.createForm.value;

    let val = this.groups.push({
      active: false,
      count: 1,
      course: this.classID,
      description: formInfo.description,
      leader: this.uid,
      location: "CHANGE THIS TO GPS COORDINATES",
      lon: 0,
      lat: 0,
      members: [this.uid],
      name: formInfo.name,
      public: formInfo.public,
      rating: 0
    });

    // let jsonObj = {};
    // jsonObj[val.key] = this.classID;
    // var ref = firebase.database().ref().child('userProfile').child(this.uid).child("groupsList");
    // ref.set(jsonObj);
    // let jsonObj = {};
    // jsonObj[val.key] = this.classID;
    // var ref = firebase.database().ref().
    //   child('userProfile').
    //   child(this.uid).
    //   child("groupsList").
    //   child(this.classID);

    var ref = firebase.database().
      ref('userProfile/' + this.uid).
      child('groupsList/' + this.classID).
      child(val.key);
    ref.set(true);

    this.groupByClass.push(val.key);

    let confirm = this.alertCtrl.create({
      title: 'Group created',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Cancel clicked');
            this.navCtrl.pop();
          }
        },
      ]
    });
    confirm.present();
  }

  cancel() {
    let confirm = this.alertCtrl.create({
      title: 'Cancel',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log('Confirm clicked');
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
