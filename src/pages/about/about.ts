import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular'
import { Api } from '../../services/apiService';
import { LoadingController, Content } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Content) content: Content;


  tilesView:boolean = true;
  listView:boolean = false;
  arr : any[];
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private api : Api,
    public loadingController:LoadingController) {

  }

  ngOnInit()
  {
    console.log("arr.len",typeof this.arr);
    let loading = this.loadingController.create(
      {
        spinner: 'hide',
        content: `
      <div class="custom-spinner-container">
        <div class="custom-spinner-box">
        <img src="./assets/imgs/loading.gif">
        <figcaption><h4 class="animated zoomIn">Getting best results for you</h4>..</figcaption>
        </div>
      </div>`,
      }
    );
    
    let x = loading.present();
    console.log('x',x);

    setTimeout(() => {
      if(typeof this.arr ===undefined)
      {
        loading.dismiss();
        console.log("No Internet connection");
        this.api.makeToast("No Internet connection");
       
      }
     
    }, 10000);
  
    this.api.get('getP').subscribe((resp) => {
      this.arr = resp;
      console.log("resp", resp);
      loading.dismissAll();
    }, (err) => {
      loading.dismissAll();
      console.log(err)
    });
    
 }

  viewActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'View',
      buttons: [
        {
          text: 'Tiles',
          icon:'apps',
          role: 'destructive',
          handler: () => {
            this.tilesView = true;
            this.listView = false;
          }
        },
        {
          text: 'List',
          icon:'funnel',
          handler: () => {
            this.tilesView = false;
            this.listView = true;
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
  sortActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Sort by',
      buttons: [
        {
          text: '₹​ Low to High',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },
        {
          text: '₹​ High to Low',
          handler: () => {
            console.log('Archive clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
 
    actionSheet.present();
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
