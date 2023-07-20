import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { environment } from 'src/environments/environment';

interface Message {
  sender: string;
  content: string;
  timestamp: Date;
}

interface Contact {
  name: string;
}

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})

export class MessageComponent implements OnInit {

  title = 'af-notification';
  message:any = null;
  token;
  contacts:Contact[] = [
    {
      name:'Pascal David'
    },
    {
      name:'Raphael Nadal'
    },
    {
      name:'Pierre DeRock'
    }
  ]

  messages:Message[]
  
  selectedContact:Contact | null = null;
  selectedMessage: Message | null = null;

  constructor() {}

  ngOnInit(): void {
    this.messages = []
    this.requestPermission();
    this.listen();
    if (this.token == undefined) {
      this.messages = [  
    {
      sender: 'Pascal David',
      content: 'Salut, comment vas-tu ?',
      timestamp: new Date()
    },
    {
      sender: 'me',
      content: 'Je vais bien, merci et toi ? je comptais passé aujourd hui afin de garder tes plantes !',
      timestamp: new Date()
    },
    {
      sender: 'Pascal David',
      content: 'Cool si jamais tu as besoin d information, hésite pas.',
      timestamp: new Date()
    },
    {
      sender: 'me',
      content: 'Super merci,',
      timestamp: new Date()
    },
    {
      sender: 'me',
      content: 'Aufait, je voulais savoir si je pouvais utlisé ton arosoire ?',
      timestamp: new Date()
    },
    {
      sender: 'Pascal David',
      content: 'Yes, dans le garage sous les baches.',
      timestamp: new Date()
    },
    {
      sender: 'me',
      content: 'Top',
      timestamp: new Date()
    },
  ]
    }
    
  }

  requestPermission() {
    const messaging = getMessaging();
    console.log(messaging);
    
    getToken(messaging, 
     { vapidKey: environment.firebase.vapidKey}).then(
       (currentToken) => {
        this.token = currentToken
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
         } else {
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
  }

  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
 
  showMessages(contact: Contact): void {
    // this.selectedMessage = message;
    this.selectedContact = this.contacts[0]
  }
}