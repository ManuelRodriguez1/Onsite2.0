import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor() { }
  users = [
    {
      'photoUrl': 'none', 
      'nombre': 'Lorem ipsum 1.',
      'projectName': 'project name1',
      'ojo':true,
      'carpeta': true,
      "puntoMessage":true
    },
    {
      'photoUrl': 'none',
      'nombre': 'Lorem ipsum 2.',
      'projectName': 'project name2',
      'ojo': true,
      'carpeta': true,
      "puntoMessage":true
        },
    {
      'photoUrl': 'none',
      'nombre': 'Lorem ipsum 3.',
      'projectName': 'project name3',
      'ojo': true,
      'carpeta': false,
      "puntoMessage":false

        },
    {
      'photoUrl': 'none',
      'nombre': 'Lorem ipsum 4.',
      'projectName': 'project name4',
      'ojo': false,
      'carpeta':false,
      "puntoMessage":false
     }
    ];
  
  ngOnInit() {
  }

}
