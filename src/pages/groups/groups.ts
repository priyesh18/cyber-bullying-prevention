import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageService } from '../../services/message';
import { ChatPage } from '../chat/chat';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@IonicPage()
@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  gname:string="";
  groups;
  ChatP=ChatPage;
  username:string="";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public msgService:MessageService,public alertCtrl:AlertController,
  public loadingCtrl:LoadingController) {
    this.username=this.navParams.get('username');

  }
  ionViewWillEnter(){
    this.presentLoading();
    this.msgService.getGroups().subscribe(grp=>
      //console.log(grp)
     this.groups=grp
    )}
  onNewGroup(gname){
    this.msgService.newGroup(gname);
    

  }
  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add New Group',
      inputs: [
        {
          name: 'title',
          placeholder: 'Group'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
           // console.log(data);
            this.onNewGroup(data.title);
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000,
    });
    loader.present();
  }




}
