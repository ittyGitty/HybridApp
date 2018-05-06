import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Post } from '../../models/Post';
import { Camera } from '@ionic-native/camera'
import { EncodingType } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { PlacesProvider } from '../../providers/places/places';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the EditPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {
  public postCollection: AngularFirestoreCollection<Post>;
  public postText: string = "";
  public title: string = "";
  public price: number = 0;
  private previewImage: string = "";
  private locationAddress: string = "";
  public post: Post;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private camera: Camera,
    private af : AngularFirestore,
    private afStorage : AngularFireStorage,
    private geolocation: Geolocation,
    private placesProvider: PlacesProvider,
    public toastCtrl: ToastController
  ) {
    this.post = navParams.get('post');
    this.postCollection = navParams.get('postCollection');
  }

  editPost() {

    let imageFileName = `${this.af.app.auth().currentUser.email}_${new Date().getTime()}.png`;
    
    let task = this.afStorage.ref(imageFileName)
      .putString(this.previewImage, 'base64', {contentType: 'image/png'});

    let uploadEvent = task.downloadURL();

    uploadEvent.subscribe((uploadImageUrl)=>{
      this.postCollection.doc(this.post.id)
        .update({ 
        title: this.title,
        body: this.postText,
        price: this.price,
        locationAddress: this.locationAddress,
        author: this.af.app.auth().currentUser.email,
        imgUrl : uploadImageUrl
      } as Post);
    }); 

    this.presentToast();
  }

  findGeolocation(){
    this.geolocation.getCurrentPosition()
      .then(position => {
        this.placesProvider.getAddressBasedOnLatLng(position.coords.latitude,
        position.coords.longitude)
        .then((place: any) => {
          this.locationAddress = place.results[1].formatted_address;
        });
      }).catch(error =>{
        console.error(error);
      });
  }

  executeCamera(){
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true
    })
    .then(imgBase64 => {
      this.previewImage = imgBase64;
    });
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Changes saved successfully',
      duration: 3000
    });
    toast.present();
  }

}
