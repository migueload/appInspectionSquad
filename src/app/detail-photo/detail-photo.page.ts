import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-detail-photo',
  templateUrl: './detail-photo.page.html',
  styleUrls: ['./detail-photo.page.scss'],
})
export class DetailPhotoPage implements OnInit {

  photo: any;
  option:any;
  user=localStorage.getItem("username");

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController
  ) { }

  ngOnInit() {
    this.photo="data:image/png;base64,"+this.activatedRoute.snapshot.paramMap.get('photo');
  }

  back(){
    this.navCtrl.navigateForward('observation-resume');
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
