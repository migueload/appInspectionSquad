import { Component, OnInit } from '@angular/core';
import {ServiceService } from '../services/service.service';
import { NavController, ActionSheetController  } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit{
  datos: any;
  nivel:any;
  isActionSheetOpen = false;
  user:any;
  vacio: boolean=false;
  swAdmin:boolean=false;


  constructor(
    private service: ServiceService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController) {
  }

 async  ngOnInit(){
    this.user=localStorage.getItem("username");
    this.nivel=localStorage.getItem("nivel");
    this.nivel=="1"?this.swAdmin=true:this.swAdmin=false;
    if(this.nivel=="1"){
      this.loadAssigmentAll();
    }else{
      this.loadAssigment();
    }
    let hasPermissionCamera=await Camera.checkPermissions();
    console.log(hasPermissionCamera);
  }


  loadAssigmentAll(){
    this.service.getAsignmentAll().subscribe(
      (data)=>{
        this.datos= data;
        data[0]==undefined?this.vacio=true:this.vacio=false;
      },
      (error)=>{
        console.error("Error al obtener los datos", error);
      }
    )
  }

  loadAssigment(){
    const id_inspector=localStorage.getItem('id_inspector');
    const datos={
      "id": id_inspector
    }
    console.log(datos);
    this.service.getAssigmentById(datos).subscribe(
      (data)=>{
        this.datos= data;
        data[0]==undefined?this.vacio=true:this.vacio=false;
      },
      (error)=>{
        console.error("Error al obtener los datos", error);
      }
    )
  }

  setCode(item: any){
    const codesArray:any=[];
    codesArray.push(item.id_inspection);
    localStorage.setItem("codes",codesArray);
    localStorage.setItem("id_assigment",item.id);
    localStorage.setItem("type_inspection",item.id_inspection);
    localStorage.setItem("address_emp",item.address_emp);
    localStorage.setItem("name_emp",item.name_emp);
    localStorage.setItem("date",item.date);
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


}


