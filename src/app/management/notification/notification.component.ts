import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  notification = [
    {
      type: 'garde',
      objet: 'demande de garde',
      date: '12/12/2023'
    }
  ]

  ngOnInit(): void {
  }

}
