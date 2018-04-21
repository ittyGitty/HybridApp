import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //templateUrl: 'search/template.html'
})
export class HomePage {

  searchQuery: string = '';
  items: string[];

  //Postene vi får fra Firebase - observable fordi det er i endring, vi leser endringene kontinuerlig
  public collection: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;

  constructor(
    public navCtrl: NavController, 
    private af: AngularFirestore,
  ) {
    
    
    this.initializeItems();

    this.collection = af.collection<Post>("posts");
    this.posts = this.collection.snapshotChanges()
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

  goToDetailPage(post: Post) {
    this.navCtrl.push('DetailPage', {
      post,
      postCollection: this.collection
    })
  }

  initializeItems() {
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}