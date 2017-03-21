import firebase from 'firebase';
import { AuthService } from '../../providers/auth-service';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Http, Response} from '@angular/http';
import { ChooseMajorsPage } from '../edit-classes/edit-classes';



@Component({
  selector: 'page-account',
  templateUrl: 'account-page.html'
})

export class AccountsPage {

	uciNetID: any;
	profileForm: any;
	loggedInUser: any;
  loggedInUserID: any;
  profilePicUrl: any;


  constructor(private http:Http, private nav: NavController,  public authData: AuthService, angFire: AngularFire, public formBuilder: FormBuilder) {


  	this.profileForm = formBuilder.group({
    	telephone: [''],
        email: [''],
        netID: [''],
        name: [''],
        imageURL: ['']
    });

  	this.loggedInUser = firebase.auth().currentUser;
    this.loggedInUserID = this.loggedInUser.uid;

  	angFire.database.list('/userProfile/' + this.loggedInUserID,  { preserveSnapshot: true})
  	.subscribe(snapshots => {
        snapshots.forEach(snapshot => {
            if(snapshot.key == "imageURL"){
              this.profileForm.controls['imageURL'].setValue(snapshot.val());
              this.profilePicUrl = snapshot.val();
            }

            if(snapshot.key == "email"){
            	this.profileForm.controls['email'].setValue(snapshot.val());
            }
            if(snapshot.key == "netID"){
            	this.profileForm.controls['netID'].setValue(snapshot.val());
            	this.uciNetID = this.profileForm.value['netID'];
            	//this will fail in your browser, in android it is fine, not tested with iOS
            	//this.saveCampusDirReqToDatabase(this.uciNetID);

            }
           	if(snapshot.key == "telephone"){
           		this.profileForm.controls['telephone'].setValue(snapshot.val());
           	}
           	if(snapshot.key == "name"){
           		this.profileForm.controls['name'].setValue(snapshot.val());
           	}

        });
    }); 

  }


  saveAccountInfo(){

  	for (var key in this.profileForm.value){
  		console.log(key, this.profileForm.value[key]);
  		var ref = firebase.database().ref().child('userProfile').child(this.loggedInUserID).child(key);
      	ref.set(this.profileForm.value[key]);
  	}

  }

  saveCampusDirReqToDatabase(netID){

  	var req = new XMLHttpRequest();  
  	req.open('GET', 'http://directory.uci.edu/index.php?uid=' + netID +'&form_type=plaintext', false);   
  	req.send(null);  
  	if(req.status == 200) {
  		var bodyIndex = req.responseText.indexOf("<body>");
  		var bodyString = req.responseText.slice(bodyIndex, -1);
  		bodyString = bodyString.replace(/<br\/>/g, '\n');
  		bodyString = bodyString.replace(/[\r\n]+/g, '*');
  		bodyString = bodyString.replace(/<body>/g, '');
  		bodyString = bodyString.replace(/<\/body>/g, '');
  		bodyString = bodyString.replace(/<\/html/g, '');
  		bodyString = bodyString.trim();
  		var bodyList = bodyString.split("*");
  		var len = bodyList.length;
  		for (var i = 0; i < len; i++){
  			var infoLine = bodyList[i].split(":");
  			if(infoLine.length > 1){
  				if(infoLine[0].trim() == "Major"){

  					var ref = firebase.database().ref().child('userProfile').child(this.loggedInUserID).child("major");
      				ref.set(infoLine[1].trim());

  				}
  				if(infoLine[0].trim() == "Student's Level"){
  					
  					var ref = firebase.database().ref().child('userProfile').child(this.loggedInUserID).child("gradeLevel");
      				ref.set(infoLine[1].trim());
  				}
  			}
  		}

  	}

  }

  updateMajors(){
    //this will take you to choose the major(s) you want to save when searching for classes to add
    this.nav.push(ChooseMajorsPage);
  }
        

}
