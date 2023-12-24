import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-observation-resume',
  templateUrl: './observation-resume.page.html',
  styleUrls: ['./observation-resume.page.scss'],
})
export class ObservationResumePage implements OnInit {

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
    private service: ServiceService
  ) {}

  ngOnInit() {
    this.getPhotos();
  }

  closeSession() {
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
          handler: () => this.closeSession(),
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
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => console.log('Action canceled'),
        },
        {
          text: 'Ok',
          handler: () => this.delPhoto(id),
        },
      ],
    });

    await alert.present();
  }

  async getPhotos() {
    try {
      const id_observation = localStorage.getItem("id_observation");
      const response = await this.service.getPhotos({ "id_observation": id_observation }).toPromise();
      this.photos = response;
    } catch (error) {
      console.log("Error fetching photos:", error);
    }
  }

  async delPhoto(id) {
    try {
      const response = await this.service.delPhoto({ 'id': id }).toPromise();
      this.getPhotos();
    } catch (error) {
      console.log("Error deleting photo:", error);
    }
  }

  async generateReport(isOpen: boolean) {
    try {
      const id = localStorage.getItem("id_assigment");
      const response = await this.service.generateReport(id).toPromise();
      this.isAlertOpen = isOpen;
    } catch (error) {
      console.log("Error generating report:", error);
    }
  }

  catchPhoto() {
    this.navCtrl.navigateForward('catch-photo');
  }


}


