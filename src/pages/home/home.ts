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
  items: Array<Post>;
  filteredPosts: string [];


  //Postene vi får fra Firebase - observable fordi det er i endring, vi leser endringene kontinuerlig
  public collection: AngularFirestoreCollection<Post>;
  public posts: Observable<Post[]>;
  public post : Post;

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
                        title: data.title,
                        ...data
                      };
                    })
                  });
  }

  //sender post og samling videre til detaljsiden:
  goToDetailPage(post: Post) {
    this.navCtrl.push('DetailPage', {
      post,
      postCollection: this.collection
    });
  }

  //sender post og samling videre for epost
  goToComposeEmailPage(post : Post) {
    this.navCtrl.push('ComposeEmailPage', {
      post,
      postCollection: this.collection
    });
  }

  initializeItems() {
/*
    this.posts.forEach(post => {
      this.filteredPosts.push(this.post)
    });

/*
    this.posts.subscribe((_posts) =>{
      this.filteredPosts = [];
      _posts.forEach(post =>{
          this.filteredPosts.push(post);
      
        })
      }); */
/*
    this.items = [
      'Amsterdam',
      'Bogota'
    ];
*/
  }

  logout() {
    this.af.app.auth().signOut();
  }



  getPosts(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    this.getPostCollection();

        // set val to the value of the searchbar
        let val = ev.target.value;
/*
    this.posts.subscribe((_posts) =>{
      this.filteredPosts = [];
      _posts.forEach(post =>{
          this.filteredPosts.push(post);
      console.log(this.filteredPosts.toString)
        })
      });

*/


/*
    this.items = Array<Post>();
    this.collection.snapshotChanges()
    .map(actions =>  {
      return actions.map(action => {
        let data = action.payload.doc.data() as Post;
        let id = action.payload.doc.id;
        this.items.push(data);
      })
    });
        /*
    if (val && val.trim() != '') {
      this.filteredPosts = this.filteredPosts.filter((post) => {
        this.filteredPosts.find(function(post){return Post === val;});
      })
    }
  

    if (val && val.trim() != '') {
      this.posts = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
*/



/*
let filteredPosts = [];
  for(let i=0, l=this.items.length; i<l; i++) {
    if(val && val.trim() != ''){
      this.items[i]['title'].toLowerCase().indexOf(val.toLowerCase()) > -1;
      //this.filteredPosts.push(this.items[i]['title']);
      this.filteredPosts.push(this.items[i]['title'].toLowerCase().indexOf(val.toLowerCase()) > -1);
    }
  }
 //return filteredPosts;
}
/*
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }*/ 
/*
    if (val && val.trim() != '') {
return this.posts.map(posts =>posts.filter((post) => {
   return (post.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
}))
 */

 /*

if (val && val.trim() != '') {
  this.posts
  .map(posts => {
    let filter = posts.filter(post => post.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
    return (filter.length > 0) ? filter[0] : null;
  });
}
*/
if (val && val.trim() != '') {
  return this.posts[1];
}
  
  }
}

