import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore'


import { AlertController } from 'ionic-angular';
/**
 * Generated class for the AuthorizePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-authorize',
  templateUrl: 'authorize.html',
})
export class AuthorizePage {
/*
  public user = {
    username: "",
    password: ""
  }
*/

public user = {
  username: "ine@online.com",
    password: "jegvilinnpåappenmin123"
};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private angFir: AngularFirestore,
    public alertCtrl: AlertController) {
  }

  loginUser(){
    this.angFir.app.auth()
    .signInWithEmailAndPassword(this.user.username, this.user.password)
    .then(response =>{
      console.log(response);
    })
    .catch(error => {
      this.showAlertErorLogin();
      console.log(error);
    })
  }

  registerUser(){
    this.angFir.app.auth()
    .createUserWithEmailAndPassword(this.user.username, this.user.password)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      this.showAlertBadChoicePassword();
      console.log(error);
    })
  }

 

  ionViewDidLoad() {
    console.log('ionViewDidLoad AuthorizePage');
  }

  showAlertBadChoicePassword() {
    let alert = this.alertCtrl.create({
      title: 'Sorry',
      subTitle: 'That`s not good enough, your password needs to be better!',
      buttons: ['OK']
    });
    alert.present();
  }

  showAlertErorLogin() {
    let alert = this.alertCtrl.create({
      title: 'Something went wrong',
      subTitle: 'Check your username and password and try again...',
      buttons: ['OK']
    });
    alert.present();
  }
}


