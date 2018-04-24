import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
/**
 * Generated class for the ComposeEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compose-email',
  templateUrl: 'compose-email.html',
})
export class ComposeEmailPage {

public post: Post;
public postCollection: AngularFirestoreCollection<Post>;
author: string;
title: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private EmailComposer: EmailComposer,
    private af : AngularFirestore) {

      this.post = navParams.get('title');
      this.author = navParams.get('author');
      this.postCollection = navParams.get('postCollection');

      let email = {
        to: this.author,
        //cc: this.af.app.auth().currentUser.email,
        subject: this.title,
        body: 'How are you? Nice greetings from Leipzig',
        isHtml: true
      };

      this.EmailComposer.open(email);
      /*
      this.EmailComposer.isAvailable().then( response =>{
          //Now we know we can send
          console.log('true!!!!!!!!!!!!!!!')
          this.EmailComposer.open(email);
        }).catch(error => {
          console.log(error);
        })*/
       }


  
     
    }

  



