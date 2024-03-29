import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmailComposer } from '@ionic-native/email-composer';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Post } from '../../models/Post';
/**
 * Generated class for the ComposeEmailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


//https://ionicframework.com/docs/native/email-composer/

@IonicPage()
@Component({
  selector: 'page-compose-email',
  templateUrl: 'compose-email.html',
})
export class ComposeEmailPage {

public post: Post;
public postCollection: AngularFirestoreCollection<Post>;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private EmailComposer: EmailComposer,
    private af : AngularFirestore) {

      this.post = navParams.get('post');
      this.postCollection = navParams.get('postCollection');

      let email = {
        to: this.post.author,
        cc: this.af.app.auth().currentUser.email,
        subject: this.post.title,
        body: 'Hi, I am interested in buying your book!',
        isHtml: true
      };

      // add alias
     

      this.EmailComposer.open(email);
    }

  


}
