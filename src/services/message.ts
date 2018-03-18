import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import {Injectable} from '@angular/core';
import {ApiAiClient} from 'api-ai-javascript';
@Injectable()
export class MessageService{
    constructor(public db:AngularFireDatabase){

    }
    newGroup(name){
        this.db.list('/group/').push(name);
    }
    newMessage(msg,groupId){
        console.log(msg);
        this.db.list('/messages/'+groupId).push(msg);
        

    }
    getGroups(){
        return this.db.list('/group/');
    }
    getMessages(groupId){
        return this.db.list('/messages/'+groupId);
    }
    token="f347e6e97d844432a8eee47e3330fbe8";
    client=new ApiAiClient({accessToken:this.token})
    talk(ques:string){
        return this.client.textRequest(ques);
    }



}

