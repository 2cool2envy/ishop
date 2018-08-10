import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';
import { Api } from '../../services/apiService';
import 'rxjs/add/operator/map';
import { LoadingController, Content } from 'ionic-angular';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  browser: any;
  link: string;
  email: any;
  msg: any;
  constructor(public navCtrl: NavController, private iab: InAppBrowser, 
    private emailComposer: EmailComposer, private api: Api, public loadingController:LoadingController) {


  }
  sendEmail() {
    this.emailComposer.isAvailable().then((available: boolean) => {
      if (available) {
        let email = { to: 'kapoormohit01@gmail.com', subject: 'Shiva Enterprises' };
        this.emailComposer.open(email);
      }
    });
  }
  openBrowser(link: string) {

    let g = "https://www.google.com/maps/?q=31.53662,75.915668";
    try{
      this.iab.create(link);
      this.browser.on('loadstop').subscribe(event => {
       this.browser.insertCSS({ code: "body{color: red;" });
     });
    }
    catch(msg)
    {
      console.log('Some Error !');
    }
  }
  submit() {
    if (this.email === null || this.email === undefined || this.email.trim().length < 1 || this.msg === null || this.msg === undefined || this.msg.trim().length < 1) {

      console.log("data not filled proper error !");
      this.api.makeToast("Add you email and message !");
    }
    else if(!this.validateEmail(this.email))
    {
      this.api.makeToast("Invalid Email");

    }
    else {
      let loading = this.loadingController.create(
        {
          spinner: 'hide',
          content: `
        <div class="custom-spinner-container">
          <div class="custom-spinner-box">
          <img src="./assets/imgs/loading2.gif">
          <figcaption><h4 class="animated zoomIn">Saving your feedback</h4>..</figcaption>
          </div>
        </div>`,
        });
        loading.present();
      var d = new Date();
      let dd = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      let body = {
        email: this.email,
        msg: this.msg,
        date: dd,
        app: 'Shop'
      };
      this.api.post('addF', body).subscribe((data) => {
        console.log('Feedback sub', data);
        loading.dismiss();
      });
    }
  }

 validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
}
