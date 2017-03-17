import { Component } from '@angular/core';
import { NavController,  NavParams } from 'ionic-angular';
import firebase from 'firebase';


@Component({
  selector: 'view-selected-majors',
  templateUrl: 'view-selected-majors.html'
})

export class ViewSelectedMajorsModal {

	depts: any;
	public loggedInUser: any;
	public loggedInUserID: any;

	constructor(public nav: NavController, params: NavParams) {

		this.depts = params.get("params");
		this.loggedInUser = firebase.auth().currentUser;
		this.loggedInUserID = this.loggedInUser.uid;

	}

	removeMajorFromList(dept){

		var index = this.depts.indexOf(dept);
		if (index > -1) {
	    	this.depts.splice(index, 1);
		} else {
	 	   this.depts.push(dept);
		}
	}

	saveMajorListToDataBase(){
		var ref = firebase.database().ref().child('userProfile').child(this.loggedInUserID).child("class_list");
		ref.set(this.depts);

	}

}