import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  profileImage;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();

    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(response => {
        this.cliente = response as ClienteDTO;
        this.getImageIfExists();
      },
      error => {

        if (error.status == 403) {
          this.navCtrl.setRoot('HomePage');
        }

      });
    }

  }

  getImageIfExists() {

    this.clienteService.getImageFromBucket(this.cliente.id).subscribe(response => {
      this.profileImage = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error => {
      this.profileImage = 'assets/imgs/avatar-blank.png';
    });

  }

  getCameraPicture() {

    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }


    this.camera.getPicture(options).then((imageData) => {
      this.picture = 'data:image/png;base64,' + imageData;
      this.cameraOn = false;
    }, (err) => {
      this.cameraOn = false;
    });
  }
  

}
