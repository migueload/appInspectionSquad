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
        console.log(this.datos);
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




  filterByDate(ev: any) {
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      this.datos = this.datos.filter((item) => {
        const itemDate = new Date(item.date);
        const filterDate = new Date(val);
        return itemDate.toISOString().slice(0, 10) === filterDate.toISOString().slice(0, 10);
      });
    } else {
      this.ngOnInit();
    }
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
