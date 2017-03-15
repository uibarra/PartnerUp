import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { NgZone } from '@angular/core';
import firebase from 'firebase';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage: any;
  zone: NgZone;

  constructor(platform: Platform) {

    firebase.initializeApp({

       // apiKey: "",
       //  authDomain: "",
       //  databaseURL: "",
       //  storageBucket: "",
       //  messagingSenderId: ""
    });

    this.zone = new NgZone({});
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      this.zone.run( () => {
        if (!user) {
          this.rootPage = LoginPage;
          unsubscribe();
        } else { 
          this.rootPage = HomePage; 
          unsubscribe();
        }
      });     
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
