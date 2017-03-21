import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html'
})
export class CreateGroupPage {
  private uid: string;
  private classID: string;
  public createForm: FormGroup;
  private groups: FirebaseListObservable<any>;
  private userGroups: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public navParams: NavParams, private formBuilder: FormBuilder, angFire: AngularFire) {
    this.uid = navParams.get('uid');
    this.classID = navParams.get('classID');

    this.createForm = this.formBuilder.group({
      name:['', Validators.required],
      description: [''],
      public: [true]
    });

    this.groups = angFire.database.list('/groups/' + this.classID);
    this.userGroups = angFire.database.list('/userProfile/' + this.uid + '/groupsList');
  }

  create() {
    let formInfo = this.createForm.value;

    let val = this.groups.push({
      active: false,
      count: 1,
      description: formInfo.description,
      leader: this.uid,
      location: "CHANGE THIS TO GPS COORDINATES",
      members: [this.uid],
      name: formInfo.name,
      public: formInfo.public,
      rating: 0
    });

    //this.userGroups.push({this.classID: val.key});
    this.userGroups.push(val.key);

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
