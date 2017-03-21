import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service';
import { ClassesPage } from '../pages/classes/classes';
import { OptionsPage } from '../pages/options/options';
import { SearchPage } from '../pages/search/search';
import { SearchGroupsPage } from '../pages/search-groups/search-groups';
import { ClassGroupsPage } from '../pages/class-groups/class-groups';
import { ChooseMajorsPage } from '../pages/edit-classes/edit-classes';
import { ChooseClassesPage } from '../pages/choose-classes/choose-classes';
import { NotificationsPage } from '../pages/notifications/notifications';
import { StudyInvitePage } from '../pages/study-invite/study-invite';
import { GroupInvitePage } from '../pages/group-invite/group-invite';
import { AccountsPage } from '../pages/account-page/account-page';

export const firebaseConfig = {
  apiKey: "AIzaSyCGvLBRGDy8SjTziO93H2ocLxwe-Lrhf6g",
  authDomain: "partnerup-f0351.firebaseapp.com",
  databaseURL: "https://partnerup-f0351.firebaseio.com",
  storageBucket: "partnerup-f0351.appspot.com",
  messagingSenderId: "889037149697"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    SearchPage,
    SearchGroupsPage,
    ClassGroupsPage,
    ClassesPage,
    OptionsPage,
    ChooseMajorsPage,
    ChooseClassesPage,
	NotificationsPage,
	StudyInvitePage,
	GroupInvitePage
    AccountsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    SearchPage,
    SearchGroupsPage,
    ClassGroupsPage,
    ClassesPage,
    OptionsPage,
    ChooseMajorsPage,
    ChooseClassesPage,
	NotificationsPage,
	StudyInvitePage,
	GroupInvitePage
    AccountsPage
  ],
  providers: [AuthService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
