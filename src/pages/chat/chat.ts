import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Content } from 'ionic-angular';
import { MessageService } from '../../services/message';
import { ActionSheetController } from 'ionic-angular/components/action-sheet/action-sheet-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  @ViewChild(Content) content: Content;

  username:string='';
  message:string='';
  messages:object[]=[];
  s;
  groupId;
  gname;

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,public db:AngularFireDatabase,public msgService:MessageService,public actionSheetCtrl:ActionSheetController,
public loadingCtrl:LoadingController) {
    this.username=this.navParams.get('username');
    
    this.groupId=this.navParams.get('key');
    this.gname=this.navParams.get('gname');

    console.log(this.groupId);

  }
  ionViewWillEnter(){
    this.msgService.getMessages(this.groupId).subscribe(msg=>{
      this.messages=msg;
      this.scrollToBottom();
      
    })
    //this.content.scrollToBottom();
  }
  sendMessage(){
    this.msgService.newMessage({name:this.username,message:this.message},this.groupId);
    this.scrollToBottom();
    //this.check();
   
    this.message='';
  }
 

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad ChatPage');
  }
  check(){
    this.msgService.talk(this.message).then((res:any)=>{
      //console.log(res);
      let val = res.result.metadata.intentName;
      if(val === 'offensive'||val === 'sexual'||val === 'body shaming'||val ==='racist'){
        this.presentActionSheet(res.result.fulfillment.speech);

      }
      else{
        this.sendMessage();
      }
    })

  }
  presentActionSheet(speech) {
    let actionSheet = this.actionSheetCtrl.create({
      title: speech,
      buttons: [
        {
          text: 'Edit',
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Go',
          role: 'cancel',
          handler: () => {
            this.sendMessage();
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  scrollToBottom() {
    setTimeout(() => {
        if (this.content.scrollToBottom) {
            this.content.scrollToBottom();
        }
    }, 400)
}

  



}
