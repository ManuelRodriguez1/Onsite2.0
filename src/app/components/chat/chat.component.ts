import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProuserService } from 'src/app/services/prouser.service';
import { Subscription } from 'rxjs';
import * as firebase from 'firebase';
declare var $: any

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  //Info para Hire
  users: any[] = []
  cont: number = 0

  //Chat
  chat: boolean = false
  name: string = ''
  projectName: string = ''
  photo: string = ''
  idPro: string = ''
  messages: any = []
  myId: string = ''
  mesg: string = ''
  //Suscripciones
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription

  constructor(private info: ProuserService) { firebase.firestore().enablePersistence() }


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
        this.users.push({ 'projectname': res.projectname })
        res.applyUsers.forEach(e => {
          this.info.getInfoPro().doc(e).snapshotChanges().subscribe((inf) => {
            temp = inf.payload.data()
            this.users[this.cont].name = temp.name + ' ' + temp.lastname
            this.users[this.cont].photo = temp.photoUrl
            this.users[this.cont].idOther = e
            this.cont++
          })
        });
      })
    }
    if (this.info.user.displayName == 'pro') {
      this.info.getChatExist().get().subscribe((c) => {
        c.forEach((c) => {
          if (c.id.includes(this.info.user.uid)) {
            var temp: any[] = c.id.split('|')
            this.info.getInfoHire().doc(temp[0]).snapshotChanges()
              .subscribe((user) => {
                var temp: any = user.payload.data()
                this.users.push({
                  'name': temp.name + ' ' + temp.lastname,
                  'photo': temp.photoUrl,
                  'idOther': user.payload.id
                })
                user.payload.ref.collection('projects')
                  .onSnapshot((h) => {
                    h.forEach((h) => {
                      var temp: string = h.data().applyUsers
                      if (temp.includes(this.info.user.uid)) {
                        this.users[this.cont].projectname = h.data().projectname
                        this.cont++
                      }
                    })
                  })
              })
          }
        })
      })
    }
  }

  initChat(e: any) {
    var hire: string = ''
    var pro: string = ''
    this.name = e.name
    this.projectName = e.projectname
    this.photo = e.photo
    this.idPro = e.idOther
    this.chat = true

    if (this.info.user.displayName == 'hire') {
      hire = this.info.user.uid
      pro = e.idOther
    } else {
      hire = e.idOther
      pro = this.info.user.uid
    }

    this.info.getChat(hire, pro).snapshotChanges()
      .subscribe((res) => {
        if (res.payload.data()) {
          var i: any = res.payload.data()
          this.messages = i.chat
          setTimeout(() => {
            $('.chatContainerHeight').scrollTop($('.chatContainerHeight').prop('scrollHeight'));
          }, 300);
        }
      })
  }

  chatMessage(e: string, msg: string) {
    var hire: string = ''
    var pro: string = ''

    if (msg != '') {
      if (this.info.user.displayName == 'hire') {
        hire = this.info.user.uid
        pro = e
      } else {
        hire = e
        pro = this.info.user.uid
      }

      this.info.chatMsg(hire, pro, msg)
      this.mesg = ''
      $(".chatContainerHeight").animate({ scrollTop: $('.chatContainerHeight').prop("scrollHeight") }, 1000);
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
    this.sub3.unsubscribe()
  }
}
