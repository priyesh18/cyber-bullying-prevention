import { GroupsPage } from './../pages/groups/groups';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ChatPage } from '../pages/chat/chat';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { MessageService } from '../services/message';
var config = {
  apiKey: "AIzaSyDErUEjwvTA4YQfH-I2FBNkB5cL2oiwye0",
  authDomain: "chat-a3da6.firebaseapp.com",
  databaseURL: "https://chat-a3da6.firebaseio.com",
  projectId: "chat-a3da6",
  storageBucket: "",
  messagingSenderId: "949177483734"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ChatPage,
    GroupsPage



  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ChatPage,
    GroupsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MessageService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
