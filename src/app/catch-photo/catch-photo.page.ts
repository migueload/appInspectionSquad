import { Component, OnInit  } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

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
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      this.image=image.webPath;
  }


    back(){
      this.navCtrl.navigateForward('observation-resume');
    }

}
