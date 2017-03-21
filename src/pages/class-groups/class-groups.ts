import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


export class Group {
  public active: boolean;
  public activeString: string;
  public count: number;
  public description: string;
  public key: string;
  public name: string;

  setActiveString(bool) {
    if (bool) {
      this.activeString = "Yes";
    } else {
      this.activeString = "No";
    }
  }
}

@Component({
  selector: 'page-class-groups',
  templateUrl: 'class-groups.html'
})

export class ClassGroupsPage {

  courseID:string;
  groups: FirebaseListObservable<any>;
  groupIDs: FirebaseListObservable<any>;
  listOfGroups: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.courseID = navParams.get('courseID');
    console.log(this.courseID, "this is the course id in class-grous.ts");
    this.groups = angFire.database.list(this.courseID);
    this.listOfGroups = new Array;

    this.groups.subscribe(groups => {
        // items is an array
        groups.forEach(groupID => {
            console.log('GroupID:', groupID.$value);
            let groupObj = new Group();
            groupObj.key = groupID.key;
            
            let query = angFire.database.list('/groups/' + groupID.$value,
              { preserveSnapshot: true }
            );

            query.subscribe(groupInfo => {
              groupInfo.forEach(feature => {
                console.log(feature);
                if (feature.key == "active") {
                  groupObj.active = feature.val();
                  groupObj.setActiveString(groupObj.active);
                } else if (feature.key == "count") {
                  groupObj.count = feature.val();
                } else if (feature.key == "name") {
                  groupObj.name = feature.val();
                }

              });
            });
           this.listOfGroups.push(groupObj); 
        });
    });


  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad ClassGroupsPage');
  // }



  showGroup() {
  }

}
