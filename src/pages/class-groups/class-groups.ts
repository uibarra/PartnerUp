import { Component } from '@angular/core';
import { NavController, ModalController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';

export class Group {
  public active: boolean;
  public activeString: string;
  public count: number;
  public description: string;
  public key: string;
  public name: string;

  public lat: number;
  public lon: number;
  public rating: number;

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

angFire: any;
courseID: string;
groupIDs: any;
listOfGroups: any;
sortedGroups: any;

constructor(public navCtrl: NavController, public navParams: NavParams, angFire: AngularFire) {
    this.angFire = angFire;
    this.courseID = navParams.get('courseID');
    console.log(this.courseID, "this is the course id in class-grous.ts");
    this.groupIDs = angFire.database.list(this.courseID);
    this.listOfGroups = new Array;
  }

  ionViewWillEnter() {
    // this.groupIDs
    //   .subscribe(groups => {
    //     groups.forEach(group => {
    //       let groupObj = new Group();
    //       groupObj.key = group.key;
    //       let query = this.angFire.database.list('/groups/' + group.key,
    //         { preserveSnapshot: true }
    //       );
    //       query.subscribe(group => {
    //         group.forEach(feature => {
    //           console.log(feature.key);
    //           if (feature.key == "active") {
    //             groupObj.active = feature.val();
    //             groupObj.setActiveString(groupObj.active);
    //           } else if (feature.key == "count") {
    //             groupObj.count = feature.val();
    //           } else if (feature.key == "name") {
    //             groupObj.name = feature.val();
    //           } else if (feature.key == "lon"){
    //              groupObj.locationX = feature.val();
    //           } else if (feature.key == "lat"){
    //              groupObj.locationY = feature.val();
    //           } else if (feature.key == "rating"){
    //             groupObj.rating = feature.val();
    //           }
    //         })
    //       })
    //
    //       this.listOfGroups.push(groupObj);
    //       console.log(this.listOfGroups);
    //     })
    //   });


    this.groupIDs.subscribe(groups => {
        // items is an array
        groups.forEach(groupID => {
            console.log('GroupID:', groupID.$value);
            let groupObj = new Group();
            groupObj.key = groupID.key;

            let query = this.angFire.database.list('/groups/' + groupID.$value,
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
                } else if (feature.key == "lat") {
                    groupObj.lat = feature.val();
                } else if (feature.key == "lon") {
                    groupObj.lon = feature.val();
                } else if (feature.key == "rating") {
                    groupObj.rating = feature.val();
                }

              });
            });
           this.listOfGroups.push(groupObj);
        });
    });

    this.sortGroups(33.64, -117.84);
  }

  sortGroups(userLocationX, userLocationY){

      var sortedArray: Group[] = this.listOfGroups.sort((group1, group2) => {
          console.log("here");
          //var group1Distance = this.distance(userLocationX, userLocationY, group1.lat, group2.lon, "M");
          //var group2Distance = this.distance(userLocationX, userLocationY, group1.lat, group2.lon, "M");
          var group1Score = group1.count + (group1.rating * 10)/* + (group1Distance * 100)*/;
          var group2Score = group2.count + (group2.rating * 10)/* + (group2Distance * 100)*/;

          if(group1.active){
            group1Score += 1000000000;
          }
          if(group2.active){
            group2Score += 1000000000;
          }

          if (group1Score > group2Score) {
              return 1;
          }

          if (group1Score < group2Score) {
              return -1;
          }

          return 0;
      });
      console.log(sortedArray);

      this.listOfGroups = sortedArray;
      //this.sortedGroups = sortedArray;
      //console.log(sortedArray);
    }

    distance(lat1, lon1, lat2, lon2, unit) {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassGroupsPage');
  }













  showGroup() {
  }

}
