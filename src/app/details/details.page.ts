import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController,AlertController, ToastController, LoadingController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage  implements OnInit{

  datos: any;
  user=localStorage.getItem("username");
  id_assing_inspection: any;
  id:any;
  id_observation:any;
  inspect_by:any;
  type:any;
  description_inspection:any;
  swPending:any;
  swCompleted:any;
  name_emp:any;
  photos:any;
  id_inspection:any;
  isAlertOpen = false;
  alertButtons = ['Action'];

  constructor(
    private navCtrl: NavController,
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController,
    private alert: AlertController,
    private toast: ToastController,
    private loadingController: LoadingController
  ) { }


  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.paramMap.get('id');
    this.showDetails(this.id);
  }

  showDetails(id:any){
    const datos={
      "id": id
    }
    this.service.getInspectionById(datos).subscribe(
      (respuesta) => {
        this.id_assing_inspection=respuesta.id;
        this.getDetails(this.id_assing_inspection);
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }


  getDetails(id:any){
    const datos={
      "id": id
    }
    this.service.getDetailsInspection(datos).subscribe(
      (respuesta) => {
        console.log(respuesta);
        this.type=respuesta[0].type_inspection;
        this.description_inspection=respuesta[0].description_inspection;
        this.inspect_by=respuesta[0].nombre_inspector;
        this.id_inspection=respuesta[0].id_inspection;
        this.datos=respuesta;
        this.name_emp=localStorage.getItem('name_emp');
        respuesta[0].status=="0"?this.swPending=true:this.swPending=false;
        respuesta[0].status=="1"?this.swCompleted=true:this.swCompleted=false;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  sendReport(isOpen: boolean){
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

  addObservation(){
    localStorage.setItem("id_inspection", this.id_inspection);
  }

  async showConfirmationPending() {
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
            this.swPending=true;
            this.updateInspection(this.id, 0);
          },
        },
      ],
    });
    await alert.present();
  }


  async showConfirmationCancel() {
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
            this.swPending=false;
            this.updateInspection(this.id, 2);
          },
        },
      ],
    });
    await alert.present();
  }


  async showPhotos(id: any){
    const loading = await this.loadingController.create({
      message: 'loading photos...',
    });
    await loading.present();

    const datos={
      "id_observation": id
    }
    this.service.getPhotos(datos).subscribe(
      (respuesta) => {
        loading.dismiss();
        this.photos=respuesta;
      },
      (error) => {
        loading.dismiss();
        console.log("Error"+ error);

      }
    );

  }

  updateInspection(id:any, status:any){
    const datos={
      "id": id,
      "status": status
    }
    this.service.setUpdateStatus(datos).subscribe(
      (respuesta) => {
        this.success();
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  async success() {
    const toast = await this.toast.create({
      message: 'The inspection was updated.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
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

  closeSesion(){
    localStorage.clear();
    this.navCtrl.navigateForward('');
  }
}
