import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/auth-service';
import { SearchPage } from '../search/search';
import { ChooseClassesPage } from '../choose-classes/choose-classes';
import { NotificationsPage } from '../notifications/notifications';
import { AccountsPage } from '../account-page/account-page';
import firebase from 'firebase';
import { SearchGroupsPage } from '../search-groups/search-groups';


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

  addClassesToSearch(){
    this.nav.push(ChooseClassesPage);
  }

  showNotifications(){
    this.nav.push(NotificationsPage);
  }

  goToAccount(){
    this.nav.push(AccountsPage);
  }

}
