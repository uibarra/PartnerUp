import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { SearchPage } from '../search/search';
import { SearchGroupsPage } from '../search-groups/search-groups';
//import { ChooseMajorsPage } from '../edit-classes/edit-classes';
import { ChooseClassesPage } from '../choose-classes/choose-classes';

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
    this.nav.push(SearchGroupsPage);
  }

  addMajorsToSearch(){
    //this will take you to choose the major(s) you want to save when searching for classes to add
    //this.nav.push(ChooseMajorsPage);
  }

  addClassesToSearch(){
    this.nav.push(ChooseClassesPage);
  }

}
