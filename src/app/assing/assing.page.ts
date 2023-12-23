import { Component, NgZone, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AlertController, ToastController, NavController, ActionSheetController } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-assing',
  templateUrl: './assing.page.html',
  styleUrls: ['./assing.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class AssingPage implements OnInit, OnDestroy{

  @ViewChild("addressSelect") addressSelect: ElementRef;
  id:any;
  datos: any;
  types: any;
  inspectors: any;
  places: any[] = [];
  query: string;
  placesSub: Subscription;
  private _places = new BehaviorSubject<any[]>([]);
  date:any;
  campos: string;
  nivel:any;
  swAdmin:boolean=false;
  isActionSheetOpen = false;
  user:any;

  get search_places() {
    return this._places.asObservable();
  }

  constructor(
    private service: ServiceService,
    private zone: NgZone,
    private alert: AlertController,
    private toast: ToastController,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController) { }


  ngOnInit(){
    this.user=localStorage.getItem("username");
      this.nivel=localStorage.getItem("nivel");
      this.nivel=="1"?this.swAdmin=true:this.swAdmin=false;
      this.loadTypeInspection();
      this.loadInspectors();
      if(this.nivel=="1"){
        this.loadAssigmentAll();
      }else{
        this.loadAssigment();
      }
      this.placesSub = this.search_places.subscribe({
        next: (places) => {
          this.places = places;
        },
        error: (e) => {
          console.log(e);
        }
      });
  }

  loadAssigment(){
    const id_inspector=localStorage.getItem('id_inspector');
    const datos={
      "id": id_inspector
    }
      this.service.getAssigmentById(datos).subscribe(
        (data)=>{
          this.datos= data;
          console.log(this.datos);
        },
        (error)=>{
          console.error("Error al obtener los datos", error);
        }
      )
  }

  loadAssigmentAll(){
    this.service.getAsignmentAll().subscribe(
      (data)=>{
        this.datos= data;
      },
      (error)=>{
        console.error("Error al obtener los datos", error);
      }
    )
  }


  loadTypeInspection(){
    this.service.getInspectionstAll().subscribe(
      (respuesta) => {
       this.types=respuesta;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  loadInspectors(){
    this.service.getInspectors().subscribe(
      (respuesta) => {
       this.inspectors=respuesta;
      },
      (error) => {
        console.log("Error"+ error);
      }
    );
  }

  async onSearchChange(event: any) {
    console.log(event);
    this.query = event.detail.value;
    if(this.query.length > 0) await this.getPlaces();
  }

  async getPlaces() {
    try {
      let service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({
        input: this.query,
        // componentRestrictions: {
        //   country: 'IN'
        // }
      }, (predictions) => {
        let autoCompleteItems = [];
        this.zone.run(() => {
          if(predictions != null) {
            predictions.forEach(async(prediction) => {
              console.log('prediction: ', prediction);
              let latLng: any = await this.geoCode(prediction.description);
              const places = {
                title: prediction.structured_formatting.main_text,
                address: prediction.description,
                lat: latLng.lat,
                lng: latLng.lng
              };
              autoCompleteItems.push(places);
            });
            //this.places = autoCompleteItems;
            //console.log('final places', this.places);
            this._places.next(autoCompleteItems);

          }
        });
      });
    } catch(e) {
      console.log(e);
    }
  }

  geoCode(address) {
    let latlng = {lat: '', lng: ''};
    return new Promise((resolve, reject) => {
      let geocoder = new google.maps.Geocoder();
      geocoder.geocode({'address' : address}, (results) => {
        console.log('results: ', results);
        latlng.lat = results[0].geometry.location.lat();
        latlng.lng = results[0].geometry.location.lng();
        resolve(latlng);
      });
    });
  }

  ngOnDestroy(): void {
    if(this.placesSub) this.placesSub.unsubscribe();
  }

  setAddress(place: any){
    this.addressSelect.nativeElement.value=place.address;
    this.places= [];
  }

  save(){
    const name=document.getElementById('name')  as HTMLButtonElement;
    const date=document.getElementById('date')  as HTMLButtonElement;
    const type=document.getElementById('type')  as HTMLButtonElement;
    const idiom=document.getElementById('idiom')  as HTMLButtonElement;
    const addressSelect=document.getElementById('address')  as HTMLButtonElement;
    const inspector=document.getElementById('inspector')  as HTMLButtonElement;

    const idioma=idiom.value;
    const fecha=date.value;
    const nombre=name.value;
    const tipo=type.value;
    const direccion=addressSelect.value;

    let inspector_id=localStorage.getItem('id_inspector');

    if(this.swAdmin){
      inspector_id=inspector.value;
      localStorage.setItem('id_inspector',inspector_id);
    }

    let campos:string="";
    if(fecha==""){
      campos="Date, ";
    }
    if(nombre==""){
      campos+="Establishment name, ";
    }
    if(tipo==null){
      campos+="Type of inspection, ";
    }
    //if(direccion==""){
      //campos+="Establishment Adrress ";
    //}
    this.campos=campos;
    if(campos!=""){
      this.validarVacio();
    }else{

      const datosAssing={
        'date': fecha,
        'idiom':idioma,
        'name_emp': nombre,
        'address_emp': direccion,
        'id_inspector':inspector_id,
        'id_inspection': tipo
      }
      console.log(datosAssing);
      this.service.saveAssing(datosAssing).subscribe(
        (respuesta) => {
          this.clearFields();
          this.success();
          if(this.nivel=="1"){
            this.loadAssigmentAll();
          }else{
            this.loadAssigment();
          }
        },
        (error) => {
          console.log("Error"+ error);
        }
      );

    }
  }

  clearFields(){
    const name=document.getElementById('name')  as HTMLButtonElement;
    const date=document.getElementById('date')  as HTMLButtonElement;
    const type=document.getElementById('type')  as HTMLButtonElement;
    const addressSelect=document.getElementById('address')  as HTMLButtonElement;
    addressSelect.value="";
    name.value="";
    type.value="";
    date.value="";
  }

  back(){
    this.navCtrl.navigateForward('dashboard');
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
            this.delAssing(id);
          },
        },
      ],
    });

    await alert.present();
  }

  delAssing(id){
      const datosAssing={
        'id':id
      }
      this.service.delAssing(datosAssing).subscribe(
        (respuesta) => {
          this.loadAssigment();
        },
        (error) => {
          console.log("Error"+ error);
        }
      );
  }

    closeSesion(){
      localStorage.clear();
      this.navCtrl.navigateForward('');
    }


  async validarVacio() {
    const toast = await this.toast.create({
      message: '('+this.campos+') Fields are required',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  async success() {
    const toast = await this.toast.create({
      message: 'The assignment was saved successfully.',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }

  async delete(){
    const toast = await this.toast.create({
      message: 'The assignment has been removed.',
      duration: 2000,
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


}
