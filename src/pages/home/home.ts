import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ChatPage } from '../chat/chat';
import { GroupsPage } from '../groups/groups';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  username:string="";

  constructor(public navCtrl: NavController,public alertCtrl:AlertController) {

  }
  alertBox(title:string,message:string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  enterUser(){
    if(/^[a-zA-Z0-9]+$/.test(this.username)){
      this.navCtrl.push(GroupsPage,{
        username:this.username
      });

    }
    else{
      this.alertBox('Error','Invalid Username');
    }
  }
  

}
