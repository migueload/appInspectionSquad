import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServiceService } from '../services/service.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username!:string;
  password!: string;

  constructor(private navCtrl: NavController, private service: ServiceService, private toastController: ToastController) {}

  login(){

    if( (this.username!=undefined) ||( this.password!=undefined)){
      const datosLogin={
        'username': this.username,
        'password': this.password
      }
      this.service.getLogin(datosLogin).subscribe(
        (respuesta) => {
          if(respuesta.id==undefined){
            this.validarLogin();
          }else{
            localStorage.setItem("email",respuesta.email);
            localStorage.setItem("id_inspector",respuesta.id);
            localStorage.setItem("nivel",respuesta.nivel);
            localStorage.setItem("username",respuesta.username);
            this.navCtrl.navigateForward('dashboard');
          }
        },
        (error) => {
          console.log("Error"+ error);
        }
      );
    }else{
      this.validarVacio();
    }

  }


  async validarVacio() {
    const toast = await this.toastController.create({
      message: 'You must enter a username and a password',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

  async validarLogin() {
    const toast = await this.toastController.create({
      message: 'invalid username and password',
      duration: 2000,
      position: 'top'
    });

    toast.present();
  }

}
