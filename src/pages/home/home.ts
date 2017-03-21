import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { SearchPage } from '../search/search';
import { ChooseClassesPage } from '../choose-classes/choose-classes';
import { AccountsPage } from '../account-page/account-page';
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

  addClassesToSearch(){
    this.nav.push(ChooseClassesPage);
  }

  goToAccount(){
    this.nav.push(AccountsPage);
  }

}
