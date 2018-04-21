import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Post } from '../../models/Post';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public post: Post;
  public postCollection: AngularFirestoreCollection<Post>;
  public comments: Observable<any[]>;
  public commentText: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.post = navParams.get('post');
    this.postCollection = navParams.get('postCollection');

    this.comments = this.postCollection
                        .doc(this.post.id)
                        .collection("comments")
                        .valueChanges(); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

}
