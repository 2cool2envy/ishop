import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Api } from '../../services/apiService';
import { ContactPage } from '../contact/contact';
import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  arr: any[] = [
    { title: 'Xerox', text: 'This is a Card, This is a Card This is a Card This is a Card This is a Card This is a Card This is a Card' },
    { title: 'Deer', text: 'This is a Card, This is a Card This is a Card This is a Card This is a Card This is a Card This is a Card' }
  ];
  constructor(public navCtrl: NavController, private api: Api) {

  }
  ngOnInit() {
    // this.api.get('quote/2').subscribe((resp) => {
    //   console.log(resp)
    // }, (err) => {

    //   console.log(err)
    // });

  }
  homeButtons(val) {
    if(val==='p')
    {
      this.navCtrl.push(AboutPage);
    }
    else{
      this.navCtrl.push(ContactPage);

    }
  }
}
