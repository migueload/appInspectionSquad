import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ActionSheetController, ToastController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-observation-resume',
  templateUrl: './observation-resume.page.html',
  styleUrls: ['./observation-resume.page.scss'],
})


export class ObservationResumePage implements OnInit{

  user=localStorage.getItem("username");
  name_emp=localStorage.getItem("name_emp");
  date=localStorage.getItem("date");
  address_emp=localStorage.getItem("address_emp");
  observation_section=localStorage.getItem("observation_section");
  observation=localStorage.getItem("observation");
  observation_child=localStorage.getItem("observation_child");
  comments=localStorage.getItem("comments");
  type_inspection=localStorage.getItem('type_inspection');
  photos:any;
  isAlertOpen = false;
  alertButtons = ['Action'];
  isRefrescar=false;

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alert: AlertController,
    private service: ServiceService,
    private toast: ToastController) {
    }


  ngOnInit(){
    this.getPhotos();
    this.refreshPage();
  }

  closeSesion(){
    localStorage.clear();
    this.navCtrl.navigateForward('');
  }


  refreshPage() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter(){
    if(this.isRefrescar){
      document.location.reload();
      this.isRefrescar=false;
    }
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Actions',
      buttons: [
        {
          text: 'Are you sure you log out?',
          role: 'exit',
          handler: () => {
            this.closeSesion()
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });
    await actionSheet.present();
  }

  async showConfirmation(id: any) {
    const alert = await this.alert.create({
      header: 'Confirmation',
      message: '¿Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Acción cancelada');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.delPhoto(id);
          },
        },
      ],
    });

    await alert.present();
  }


  getPhotos(){
    const dato={
      "id_observation": localStorage.getItem('id_observation')
    }
    this.service.getPhotos(dato).subscribe(
      (respuesta) => {
        this.photos=respuesta;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  delPhoto(id){
    const datosPhoto={
      'id':id
    }
    this.service.delPhoto(datosPhoto).subscribe(
      (respuesta) => {
        this.getPhotos();
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
}


  generateReport(isOpen: boolean){
    const id=localStorage.getItem("id_assigment");
    this.service.generateReport(id).subscribe(
      (respuesta) => {
        this.isAlertOpen = isOpen;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );

  }

  public async takePhoto(){
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
    });
    this.saveImage(image.base64String);
    this.ngOnInit();
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
        this.getPhotos();
        this.isRefrescar=true;
        this.ngOnInit();
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
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


