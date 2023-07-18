import { Component } from '@angular/core';

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
export class MessageComponent {
  contacts:Contact[] = [
    {
      name:'Allan Parker'
    },
    {
      name:'Michel Deroute'
    },
    {
      name:'Pascal Dapert'
    }
  ]
  messages:Message[] = [  
    {
      sender: 'Allan Parker',
      content: 'Hey, je voulais savoir comment se passe la garde de mes plantes ?',
      timestamp: new Date()
    },
    {
      sender: 'me',
      content: 'Hey Allan, tout est niquel, je me suis permis de me servir de l arosoir posé dehors, cela ne te dérange pas ?',
      timestamp: new Date()
    },
    {
      sender: 'Allan Parker',
      content: 'Aucunement, c est parfait ! Je vous souhaite une agréable soirée',
      timestamp: new Date()
    },
    {
      sender: 'me',
      content: 'Egalement !',
      timestamp: new Date()
    },
  ]
  selectedContact:Contact | null = null;
  selectedMessage: Message | null = null;

  showMessages(contact: Contact): void {
    // this.selectedMessage = message;
    this.selectedContact = this.contacts[0]
  }
}