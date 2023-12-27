import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../services/service.service';
import { NavController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-observation-section',
  templateUrl: './observation-section.page.html',
  styleUrls: ['./observation-section.page.scss'],
})
export class ObservationSectionPage implements OnInit{

  id_observation: any;
  observations:any;
  user:any;
  name_emp:any;
  date:any;
  address_emp:any;


  constructor(
    private service: ServiceService,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController) {
   }
  ngOnInit(){
    this.id_observation=this.activatedRoute.snapshot.paramMap.get('id');
    this.user=localStorage.getItem("username");
    this.name_emp=localStorage.getItem("name_emp");
    this.date=localStorage.getItem("date");
    this.address_emp=localStorage.getItem("address_emp");
    this.loadObservationSection(this.id_observation);
  }


  loadObservationSection(id_observation: any){
    const datos={
      "id":id_observation
    }
    this.service.getObservationSection(datos).subscribe(
      (respuesta) => {
        this.observations=respuesta;
        console.log(this.observations);
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
    localStorage.setItem("observation_section",item.description);
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
