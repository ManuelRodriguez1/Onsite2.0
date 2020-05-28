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
      'ojo': '1',
      'carpeta': '2',

    },
    {
      'photoUrl': 'none',
      'nombre': 'Lorem ipsum 2.',
      'projectName': 'project name2',
      'ojo': '1',
      'carpeta': '2',

        },
    {
      'photoUrl': 'none',
      'nombre': 'Lorem ipsum 3.',
      'projectName': 'project name3',
      'ojo': '1',
      'carpeta': '2',

        },
    {
      'photoUrl': 'none',
      'nombre': 'Lorem ipsum 4.',
      'projectName': 'project name4',
      'ojo': '1',
      'carpeta': '2',

        }];

  ngOnInit() {
  }

}
