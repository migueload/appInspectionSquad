import { Component, OnInit  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-catch-photo',
  templateUrl: './catch-photo.page.html',
  styleUrls: ['./catch-photo.page.scss'],
})
export class CatchPhotoPage implements OnInit{

  public image:any;

  constructor(
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.takePhoto();
  }

  public async takePhoto(){
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });
      this.image=image.webPath;
  }


    back(){
      localStorage.setItem('imagen', this.image);
      this.navCtrl.navigateForward('observation-resume');
    }

}
