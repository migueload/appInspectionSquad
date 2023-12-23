import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ToastController,AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-inspector',
  templateUrl: './inspector.page.html',
  styleUrls: ['./inspector.page.scss'],
})
export class InspectorPage implements OnInit {

  datos:any;
  campos: string;
  user=localStorage.getItem("username");

  constructor(
    private service: ServiceService,
    private toast : ToastController,
    private alert: AlertController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.loadInspectors();
  }

  loadInspectors(){
    this.service.getInspectors().subscribe(
      (respuesta) => {
        this.datos=respuesta;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
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
            this.delInspectors(id);
          },
        },
      ],
    });

    await alert.present();
  }


  save(){
    const name=document.getElementById('name')  as HTMLButtonElement;
    const last_name=document.getElementById('last_name')  as HTMLButtonElement;
    const email=document.getElementById('email')  as HTMLButtonElement;
    const address=document.getElementById('address')  as HTMLButtonElement;
    const phone=document.getElementById('phone')  as HTMLButtonElement;
    const nombre=name.value;
    const apellido=last_name.value;
    const correo=email.value;
    const direccion=address.value;
    const telefono=phone.value;

    let campos:string="";
    if(nombre==""){
      campos="Name, ";
    }
    if(apellido==""){
      campos+="Last Name, ";
    }
    if(telefono==""){
      campos+="Number Phone, ";
    }
    if(correo==""){
      campos+="E-mail, ";
    }

    this.campos=campos;
    if(campos!=""){
      this.validarVacio();
    }else{

      const datos={
        'name': nombre,
        'last_name':apellido,
        'email': correo,
        'phone': telefono,
        'address':direccion
      }
      console.log(datos);
      this.service.saveInspector(datos).subscribe(
        (respuesta) => {
          this.clearFields();
          this.success();
          this.loadInspectors();
        },
        (error) => {
          console.log("Error"+ error);
        }
      );

    }
  }

  delInspectors(id: any){
    const datosinspector={
      'id':id
    }
    this.service.delInspector(datosinspector).subscribe(
      (respuesta) => {
        this.loadInspectors();
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  clearFields(){
    const name=document.getElementById('name')  as HTMLButtonElement;
    const last_name=document.getElementById('last_name')  as HTMLButtonElement;
    const email=document.getElementById('email')  as HTMLButtonElement;
    const address=document.getElementById('address')  as HTMLButtonElement;
    const phone=document.getElementById('phone')  as HTMLButtonElement;
    name.value;
    last_name.value="";
    email.value="";
    phone.value="";
    address.value="";
  }

  back(){
    this.navCtrl.navigateForward('dashboard');
  }


  closeSesion(){
    localStorage.clear();
    this.navCtrl.navigateForward('');
  }


  async success() {
    const toast = await this.toast.create({
      message: 'The inspector was saved successfully.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }


  async validarVacio() {
    const toast = await this.toast.create({
      message: '('+this.campos+') Fields are required',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }


  async delete(){
    const toast = await this.toast.create({
      message: 'The inspector has been eliminated.',
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }

}
