import { Component, OnInit  } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ServiceService } from '../services/service.service';


@Component({
  selector: 'app-catch-photo',
  templateUrl: './catch-photo.page.html',
  styleUrls: ['./catch-photo.page.scss'],
})
export class CatchPhotoPage implements OnInit{

  public image:any;

  constructor(
    private navCtrl: NavController,
    private service: ServiceService,
    private toast: ToastController
  ) {
    this.refreshPage();
  }

  ngOnInit(): void {
    this.takePhoto();
  }


  refreshPage() {
     this.ionViewWillEnter();
  }

  ionViewWillEnter(){
     console.log("refresh");
  }


  public async takePhoto(){
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      this.saveImage(image.base64String);
      this.renderizarImagen(image.base64String);
  }

  renderizarImagen(base64String: string): void {
    this.image = "data:image/png;base64," + base64String;
  }

  saveImage(image: any){
     const id_inspection=localStorage.getItem("id_inspection");
     const id_observation=localStorage.getItem("id_observation");
     const datosInspectionImage={
       "id_inspection":id_inspection,
       "id_observation": id_observation,
       "url_image": image
     };
    this.service.saveImage(datosInspectionImage).subscribe(
      (respuesta) => {
        this.success();
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  back(){
    this.navCtrl.navigateForward('observation-resume');
  }


  async success() {
    const toast = await this.toast.create({
      message: 'The photo has been saved.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }


}
