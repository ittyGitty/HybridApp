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
    
    this.collection = af.collection<Post>("posts");
    

    this.getPostCollection();
    //this.initializeItems();

  }

  getPostCollection(){
    
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
    });
  }

  goToComposeEmailPage(post : Post) {
    this.navCtrl.push('ComposeEmailPage', {
      post,
      postCollection: this.collection
    });
  }

  initializeItems() {

  

/*
    this.posts.subscribe((data: any)=> {
    this.items.push(data);
-------------------------------------
     this.posts.map((post)=> post.entries).subscribe((data)=>{
     this.items.push(data);
   })
  }); 

  ------------------------------
    
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
    */
  }

  logout() {
    this.af.app.auth().signOut();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
   // this.initializeItems();

    this.getPostCollection();

    // set val to the value of the searchbar
    let val = ev.target.value;


    if (val && val.trim() != '') {
      this.posts = this.posts.filter((title) => {
        return (title.toString().toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

/*
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  } */
  }
