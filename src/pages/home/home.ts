import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/Post';
import { QuerySnapshot } from '@firebase/firestore-types';
import { forEach } from '@firebase/util/dist/esm/src/obj';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  //templateUrl: 'search/template.html'
})
export class HomePage {

  searchQuery: string = '';
  items: string [];
  filteredPosts: Array <Post>;

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

    this.posts.subscribe((_posts) =>{
      this.filteredPosts = [];
      _posts.forEach(post =>{
          this.filteredPosts.push(post);
          return this.filteredPosts;
        })
      });
/*
    this.collection = this.af.collection<Post>(posts => {
      return ref
      .onSnapshot(querySnapshot => {
        this.items = [];
        querySnapshot.forEach(posts => {
          this.items.push('title');
        })
      });
    });

/*
    querySnapshot.forEach(function (doc) {
      let title = doc.data()['title']; 
      this.items.push(title);
    });
/*
    this.collection("title")
    .onSnapshot(function(querySnapshot) {
        this.items = [];
        querySnapshot.forEach(function(posts) {
            this.items.push(posts.data().title);
        });


    this.posts.subscribe((title: any) => {
    this.items.push(title);
  }) */
}


/*    
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
  

  logout() {
    this.af.app.auth().signOut();
  }

  getItems(ev: any) {
    // Reset items back to all of the items
   this.initializeItems();

    //this.getPostCollection();

    // set val to the value of the searchbar
    let val = ev.target.value;

   
      
    


    if (val && val.trim() != '') {
      this.filteredPosts = this.filteredPosts.filter((title) => {
        return (JSON.stringify(title).toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  

/*
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } */
  } 
}
