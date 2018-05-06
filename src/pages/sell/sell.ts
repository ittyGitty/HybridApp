import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import { AlertController } from 'ionic-angular';
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
  public userPosts: Observable<Post[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private af: AngularFirestore,
    private afStorage : AngularFireStorage,
    public alertCtrl: AlertController) {

      //forelesning 12
     this.collection = af.collection<Post>('posts', (ref) => {
                        return ref.where('author', '==', this.af.app.auth().currentUser.email);
                      });
      this.posts = this.collection.snapshotChanges()
            //      .filter((post)=> post.author == this.af.app.auth().currentUser.email)
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


thisWillRemovePost(post: Post){
  let prompt = this.alertCtrl.create({
    title: 'Beware',
    message: "This will delete your listing completely",
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Confirm',
        handler: data => {
          this.collection.doc(post.id)
        .delete().then(function(){
          //KALLPÅ DELETED
        
        }).catch(function(error){
          console.error("wooops", error);

        });
        }
      }
    ]
  });
  prompt.present();

}

  ionViewDidLoad() {
    /*
    const task_stream =
  // Makes a stream of all the tasks in the database
  this.afStorage.app.database.arguments.getTasks().
    // Get tasks only for this user
    filter((task) => task.author == this.af.app.auth().currentUser.email)
    // Only get name of task
    .map((task) => task.post)
  */
  }

  goToAddPostPage() {
    this.navCtrl.push('AddPostPage', {
      postCollection: this.collection
    })
  }

  goToEditPostPage(post: Post) {
    this.navCtrl.push('EditPostPage', {
      post,
      postCollection: this.collection
    });
  }

}
