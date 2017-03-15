import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../providers/auth-service';
import { ClassesPage } from '../pages/classes/classes';
import { OptionsPage } from '../pages/options/options';
import { SearchPage } from '../pages/search/search';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    SearchPage,
    ClassesPage,
    OptionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ResetPasswordPage,
    SignupPage,
    SearchPage,
    ClassesPage,
    OptionsPage
  ],
  providers: [AuthService]
})
export class AppModule {}
