import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { SearchPage } from '../search/search';
import { ChooseMajorsPage } from '../edit-classes/edit-classes';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  constructor(private nav: NavController,  public authData: AuthService) {

  }

  logOut(){
    this.authData.logoutUser().then(() => {
      this.nav.setRoot(LoginPage);
    });
  }

  searchClass(){
    this.nav.push(SearchPage);
  }

  editClassesToSearch(){
    //this will take you to choose the major(s) you want to search for then to the class lists for those choosen majors
    this.nav.push(ChooseMajorsPage);
  }

}
