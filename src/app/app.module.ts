
//https://github.com/angular/angularfire2/blob/HEAD/docs/ionic/cli.md

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

//import { Camera } from '@ionic-native/camera';

import env from './env';
//import { PlacesProvider } from '../providers/places/places';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorage } from 'angularfire2/storage';

//https://www.npmjs.com/package/@ionic-native/geolocation
import { Geolocation as geo } from '@ionic-native/geolocation';
import { DetailPage } from '../pages/detail/detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(env, 'TDS200_703842'), //importerer firebase/app for alt
    AngularFirestoreModule, 
    AngularFireAuthModule, //importerer firebase/auth for autorisering
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    //Camera,
    AngularFireStorage,
    geo
    //PlacesProvider
  ]
})
export class AppModule {}
