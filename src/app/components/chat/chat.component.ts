import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import { Subscription } from 'rxjs';
declare var $: any

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  //Info para Hire
  usersPro: any[] = []
  cont: number = 0
  //Chat
  chat: boolean = false
  name: string = ''
  projectName: string = ''
  photo: string = ''
  idPro: string = ''
  messages: any = []
  myId: string = ''
  //Suscripciones
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private info: ProuserService) { }


  ngOnInit() {

    this.myId = this.info.user.uid

    if (this.info.user.displayName == 'hire') {
      this.sub1 = this.info.getInfoHire().doc(this.info.user.uid).collection('projects').snapshotChanges()
        .subscribe((p) => {
          p.forEach((p) => {
            if (p.payload.doc.data().applyUsers || p.payload.doc.data().applyUsers.length > 0) {
              this.info.usersChat.emit(p.payload.doc.data())
            }
          })
        })

      this.sub2 = this.info.usersChat.subscribe((res) => {
        var temp: any = ''
        this.usersPro.push({ 'projectname': res.projectname })
        res.applyUsers.forEach(e => {
          this.info.getInfoPro().doc(e).snapshotChanges().subscribe((inf) => {
            temp = inf.payload.data()
            this.usersPro[this.cont].name = temp.name + ' ' + temp.lastname
            this.usersPro[this.cont].photo = temp.photoUrl
            this.usersPro[this.cont].idOther = e
            this.cont++
          })
        });
      })

    }
  }

  initChat(e: any) {
    this.name = e.name
    this.projectName = e.projectname
    this.photo = e.photo
    this.idPro = e.idOther
    this.chat = true

    this.info.getChat(this.info.user.uid, this.idPro).snapshotChanges()
      .subscribe((res) => {
        if (res.payload.data()) {
          var i: any = res.payload.data()
          this.messages = i.chat
        }
      })
  }

  chatMessage(e: string, msg: string) {
    if (msg != '') {
      this.info.chatMsg(this.info.user.uid, e, msg)
      $("#msgChat").val('')
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }
}
