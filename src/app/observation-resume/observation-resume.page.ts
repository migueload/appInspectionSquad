import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

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

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private alert: AlertController,
    private service: ServiceService) {
    }


  ngOnInit(){
    this.refreshPage();
    this.getPhotos();
  }

  refreshPage() {
    this.ionViewWillEnter();
  }

  ionViewWillEnter(){
    console.log("refresh");
  }

  closeSesion(){
    localStorage.clear();
    this.navCtrl.navigateForward('');
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
    const id_observation=localStorage.getItem("id_observation");
    const dato={
      "id_observation":id_observation
    }
    this.service.getPhotos(dato).subscribe(
      (respuesta) => {
        this.photos=respuesta;
        this.refreshPage();

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

  cathPhoto(){
    this.navCtrl.navigateForward('catch-photo');
  }

}
