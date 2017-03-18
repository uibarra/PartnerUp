import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import firebase from 'firebase';


@Component({
  selector: 'page-choose-classes',
  templateUrl: 'choose-classes.html'
})

export class ChooseClassesPage {

	depts: any;
  	selectedClasses: any;
  	public loggedInUser: any;
  	public loggedInUserID: any;
  	firebaseReference: any;
  	classes: FirebaseListObservable<any[]>;
  	deptListOfDepartmentObjects: any;

  	constructor(public nav: NavController, public alertCtrl: AlertController, angFire: AngularFire) {

  		this.selectedClasses = [];
    	this.loggedInUser = firebase.auth().currentUser;
    	this.loggedInUserID = this.loggedInUser.uid;
    	this.firebaseReference = firebase.database().ref('/userProfile/' + this.loggedInUserID);
    	this.depts = [];
    	this.deptListOfDepartmentObjects = [];
    	this.selectedClasses = [];
    	this.getDepartments(angFire);
    	this.getClassesOfAllSpecifiedDepartments(angFire);
    	
  	}

  	getDepartments(angFire){

		angFire.database.list('/userProfile/' + this.loggedInUserID + '/majorsList', { preserveSnapshot: true})
    	.subscribe(snapshots => {
        	snapshots.forEach(snapshot => {
          		this.depts.push(snapshot.val());
        	});
    	})
  	}

  	getClassesOfAllSpecifiedDepartments(angFire){
  		for (let department of this.depts) {
   			this.classes = angFire.database.list('/department/' + department);
   			this.deptListOfDepartmentObjects.push(angFire.database.list('/department/' + department));
		}

  	}

  	addClass(className){
  		var index = this.selectedClasses.indexOf(className);
		if (index > -1) {
	    	this.selectedClasses.splice(index, 1);
		} else {
	 	   this.selectedClasses.push(className);
		}
  	}

  	saveClassesToDatabase(){
  		var ref = firebase.database().ref().child('userProfile').child(this.loggedInUserID).child("classesList");
		ref.set(this.selectedClasses);
  	}

}