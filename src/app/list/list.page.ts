import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController  } from '@ionic/angular';
import { ServiceService } from '../services/service.service';



@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  datos: any;
  user=localStorage.getItem("username");
  isActionSheetOpen = false;
  status: any;
  vacio: boolean=false;
  id_assing_inspection: any;
  selectedDate: string;
  filteredDatos: any[];


  constructor(
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController,
    private service: ServiceService
  ) { }

  ngOnInit() {
    this.load(0);
    this.filterByDate();
  }

  load(status: any){
    const nivel=localStorage.getItem("nivel");
    if(nivel=="1"){
      this.getInspectionsByStatus(status);
    }else{
      this.getInspectionsByStatusAndId(status,localStorage.getItem("id_inspector"));
    }
  }


  getStatus(status: any):String{
    let result="";
    if(status==0){
      result= "PENDING";
    }
    if(status==1){
      result= "COMPLETED";
    }
    if(status==2){
      result= "CANCELED";
    }
    return result;
  }

  getInspectionsByStatus(status: any,){
    const datosInspectionStatus={
      "status": status
    }
    this.service.getInspectionsByStatus(datosInspectionStatus).subscribe(
      (respuesta) => {
        this.datos=respuesta;
        respuesta[0]==undefined?this.vacio=true:this.vacio=false;
        this.status=this.getStatus(status);
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  getInspectionsByStatusAndId(status: any, id_inspector: any){
    const datosInspectionStatus={
      "status": status,
      "id":id_inspector
    }
    this.service.getInspectionsByStatusAndId(datosInspectionStatus).subscribe(
      (respuesta) => {
        this.datos=respuesta;
        respuesta[0]==undefined?this.vacio=true:this.vacio=false;
        this.status=this.getStatus(status);
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }


  filterByDate() {
    if (this.selectedDate) {
      const selectedDateFormatted = new Date(this.selectedDate).toLocaleDateString;
      this.filteredDatos = this.datos.filter((dato) => dato.date === selectedDateFormatted);
      this.vacio = this.filteredDatos.length === 0;
    } else {
      this.filteredDatos = this.datos;
      this.vacio = false;
    }
  }

  onDateChange(event: any) {
    this.selectedDate = event.detail.value;
    this.filterByDate();
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
