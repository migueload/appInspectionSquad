import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { NavController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-observation-child',
  templateUrl: './observation-child.page.html',
  styleUrls: ['./observation-child.page.scss'],
})
export class ObservationChildPage implements OnInit {

  id_observation: any;
  observations:any;
  comments:any="";
  user=localStorage.getItem("username");
  name_emp=localStorage.getItem("name_emp");
  date=localStorage.getItem("date");
  address_emp=localStorage.getItem("address_emp");
  id_inspection=localStorage.getItem("id_inspection");


  constructor(
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController) {
   }
  ngOnInit(){
    this.id_observation=this.activatedRoute.snapshot.paramMap.get('id');
    this.loadObservationChild(this.id_observation);
    this.id_inspection=localStorage.getItem("id_inspection");
  }


  loadObservationChild(id_observation: any){
    const datos={
      "id":id_observation
    }
    this.service.getObservationChild(datos).subscribe(
      (respuesta) => {
        this.observations=respuesta;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  setCode(item: any){
    const codeAnt=localStorage.getItem("codes");
    const codesArray:any=[codeAnt];
    codesArray.push(item.code);
    localStorage.setItem("codes",codesArray);
    localStorage.setItem("observation_child",item.observation_child_name);
  }


  saveInspection(){
      if(this.id_inspection!=""){
        const datosObservationes: string[]=localStorage.getItem("codes").split(',');
        this.saveInspectionDetails(this.id_inspection);
      }else{

        const datosInspection={
          "id_inspector": localStorage.getItem("id_inspector"),
          "id_assing_inspection":localStorage.getItem("id_assigment")
        };

        this.service.saveInspection(datosInspection).subscribe(
          (respuesta) => {
            localStorage.setItem("id_inspection",respuesta);
            this.saveInspectionDetails(respuesta);
            if(this.observations==""){
              localStorage.setItem("observation_child","");
            }
          },
          (error) => {
            console.log("Error"+ error);
          }
        );
      }
      this.navCtrl.navigateForward('observation-resume');
  }

  saveInspectionDetails(id_inspection: any){
     /**Extrae los codigo de la Observaciones */
     const datosObservationes: string[]=localStorage.getItem("codes").split(',');
     const datosInspectionDetails={
       "id_inspection":id_inspection,
       "type_inspection": datosObservationes[0],
       "observation_section": datosObservationes[1],
       "observation": datosObservationes[2],
       "observation_child": datosObservationes[3],
       "comments":this.comments
     };
    localStorage.setItem("comments", this.comments);
    this.service.saveInspectionDetails(datosInspectionDetails).subscribe(
      (respuesta) => {
        localStorage.setItem("id_observation",respuesta);
        console.log("exito");
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
    this.clearObservations();
  }


  clearObservations(){
    const codesArray:any=[];
    const datosObservationes: string[]=localStorage.getItem("codes").split(',');
    const type_inspection=datosObservationes[0];
    localStorage.setItem("codes","");
    codesArray.push(type_inspection);
    localStorage.setItem("codes",codesArray);
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
