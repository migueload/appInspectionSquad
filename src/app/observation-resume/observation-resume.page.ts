import { Component } from '@angular/core';
import { NavController, ActionSheetController, ToastController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-observation-resume',
  templateUrl: './observation-resume.page.html',
  styleUrls: ['./observation-resume.page.scss'],
})
export class ObservationResumePage {

  user=localStorage.getItem("username");
  name_emp=localStorage.getItem("name_emp");
  date=localStorage.getItem("date");
  address_emp=localStorage.getItem("address_emp");
  observation_section=localStorage.getItem("observation_section");
  observation=localStorage.getItem("observation");
  observation_child=localStorage.getItem("observation_child");
  comments=localStorage.getItem("comments");
  type_inspection=localStorage.getItem('type_inspection');

  constructor(
    public navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private toast: ToastController,
    private service: ServiceService) { }


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

  generateReport(){
    const id=localStorage.getItem("id_assigment");
    this.service.generateReport(id).subscribe(
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
      message: 'The report has been sent successfully.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

}
