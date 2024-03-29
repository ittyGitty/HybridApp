import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

//import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
//import { SellPage } from '../pages/sell/sell';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    af: AngularFirestore
  ){


const authObserver = af.app.auth().onAuthStateChanged(
  (user) => {
    if(user){
      this.rootPage = TabsPage;
    }else{
      this.rootPage = TabsPage;
      //this.rootPage = 'AuthorizePage';
    }
  }
)



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

