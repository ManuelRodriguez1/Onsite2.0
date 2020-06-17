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
  dateToday: any = new Date()
  //Suscripciones
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription
  tempSub: Subscription

  constructor(private info: ProuserService) { firebase.firestore().enablePersistence() }


  ngOnInit() {

    this.myId = this.info.user.uid

    if (this.info.user.displayName == 'hire') {
      this.sub1 = this.info.getInfoHire().doc(this.info.user.uid).collection('projects').get()
        .subscribe((p) => {
          p.forEach((p) => {
            if (p.data().applyUsers || p.data().applyUsers.length > 0) {
              this.info.usersChat.emit(p.data())
            }
          })
        })

      this.sub2 = this.info.usersChat.subscribe((res) => {
        var temp: any = ''
        this.users.push({ 'projectname': res.projectname })
        res.applyUsers.forEach(e => {
          this.info.getInfoPro().doc(e).get().subscribe((inf) => {
            var t2: boolean = false
            this.info.getChatExist().get().subscribe((s) => {
              s.forEach((f) => {
                if (f.id.includes(e) && f.id.includes(this.myId)) {
                  var t = f.data().chat
                  if (t[t.length - 1].id == this.myId) {
                    t2 = true
                  }
                }
              })
              temp = inf.data()
              if (this.cont != this.users.length) {
                this.users[this.cont].name = temp.name + ' ' + temp.lastname
                this.users[this.cont].photo = temp.photoUrl
                this.users[this.cont].idOther = e
                this.users[this.cont].noRead = t2
                this.cont++
              }
            })
          })
        });
      })
    }
    if (this.info.user.displayName == 'pro') {
      this.sub1 = this.info.getChatExist().get().subscribe((c) => {
        c.forEach((c) => {
          if (c.id.includes(this.myId)) {
            var temp: any[] = c.id.split('|')
            var t: any[] = c.data().chat
            var t2: boolean = false
            if (t[t.length - 1].id == this.myId) {
              t2 = true
            }
            this.info.getInfoHire().doc(temp[0]).get()
              .subscribe((user) => {
                var temp: any = user.data()
                this.users.push({
                  'name': temp.name + ' ' + temp.lastname,
                  'photo': temp.photoUrl,
                  'idOther': user.id,
                  'noRead': t2
                })
                user.ref.collection('projects').get()
                  .then((h) => {
                    h.forEach((h) => {
                      if (h.data().applyUsers) {
                        var temp2: any = h.data().applyUsers
                        if (temp2.includes(this.myId)) {
                          this.users[this.cont].projectname = h.data().projectname
                          this.cont++
                        }
                      }
                    })
                  })
              })
          }
        })
      })
    }

    this.sub3 = this.info.getChatExist().stateChanges()
      .subscribe((d) => {
        d.map((i) => {
          if (i.payload.doc.id.includes(this.myId) && i.type === 'modified') {
            var temp = i.payload.doc.id.split('|')
            var t = this.info.user.displayName == 'hire' ? temp[1] : temp[0]
            this.users.map((m) => {
              if (m.idOther == t && m.idOther != this.idPro) {
                m.noRead = false
              }
            })
          }
        })
      })
  }

  initChat(e: any) {
    this.messages = []
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

    this.tempSub = this.info.getChat(hire, pro).snapshotChanges()
      .subscribe((res) => {
        if (res.payload.data()) {
          var i: any = res.payload.data()
          var user = this.info.user.displayName == 'hire' ? pro : hire
          if (this.idPro == user) {
            this.messages = i.chat
            setTimeout(() => {
              $('.chatContainerHeight').scrollTop($('.chatContainerHeight').prop('scrollHeight'));
            }, 20);
          }
        }
      })

    this.users.map((m) => {
      if (m.idOther == this.idPro) {
        m.noRead = true
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

      this.info.chatMsg(hire, pro, msg, true)
      this.mesg = ''
      $(".chatContainerHeight").animate({ scrollTop: $('.chatContainerHeight').prop("scrollHeight") }, 1000);
    }
  }

  ngOnDestroy() {
    if (this.info.user.displayName == 'hire') {
      this.sub1.unsubscribe()
      this.sub2.unsubscribe()
    } else {
      this.sub1.unsubscribe()
    }
    this.sub3.unsubscribe()
    this.tempSub.unsubscribe()
  }
}
