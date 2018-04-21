import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
/**
 * Generated class for the SellPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sell',
  templateUrl: 'sell.html',
})
export class SellPage {

  public collection: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;
  public user = {};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore) {

let user = this.af.app.auth().currentUser.email;

      this.collection = af.collection<Post>("posts");
      this.posts = this.collection.snapshotChanges()
                  .filter((post)=> this.af.app.auth().currentUser.email == user)
                    .map(actions =>  {
                      return actions.map(action => {
                        let data = action.payload.doc.data() as Post;
                        let id = action.payload.doc.id;

                        return {
                          id,
                          ...data
                        };
                      })
                    });

  }

  ionViewDidLoad() {
    /*const personRef: firebase.database.Reference = firebase.database().ref(`/person1/`);
  personRef.on('value', personSnapshot => {
    this.user = personSnapshot.val();
  }); */
  }

  goToAddPostPage() {
    this.navCtrl.push('AddPostPage', {
      postCollection: this.collection
    })
  }

}
