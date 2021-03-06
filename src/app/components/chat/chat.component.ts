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
  usersTem: any[] = []
  projectsUsers: any[] = []
  showProjects: any[] = []
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
  // Modal Chat
  skills: any[] = []
  up: boolean = false
  up2: boolean = false
  modal: number = 0
  hire: boolean = false
  skillS: string = ''
  projectS: string = ''
  onlyNumber = new RegExp(/^[1-9][0-9]{0,4}(?:[.]\d{0,2})?$/)
  infoTemp: any = ''
  // Filtros chat
  unread: boolean = false
  totalUnread: number = 0
  search: string = ''
  //Message Accept
  word: string = 'Accept'
  negotiation: any = []
  idProject: string = ''
  priceHour: number = 0
  disabled: boolean = true
  applyusers: any[] = []
  //Suscripciones
  sub1: Subscription
  sub2: Subscription
  sub3: Subscription
  tempSub: Subscription
  //Notificaciones
  folder: any = ''
  tempNotify: any[] = []

  constructor(public info: ProuserService) { firebase.firestore().enablePersistence() }


  ngOnInit() {

    this.myId = this.info.user.uid

    if (this.info.user.displayName == 'hire') {
      this.sub1 = this.info.getInfoHire().doc(this.info.user.uid).collection('projects').get()
        .subscribe((p) => {
          p.forEach((p) => {
            if (p.data().applyUsers) {
              if (p.data().applyUsers.length > 0) {
                if (p.data().statusname != 'Deleted') {
                  this.projectsUsers.push({ 'idProject': p.id, 'projectName': p.data().projectname, 'usersPro': p.data().applyUsers })
                }
                this.info.usersChat.emit(p.data())
              }
            }
          })
        })

      this.sub2 = this.info.usersChat.subscribe((res) => {
        var temp: any = ''
        res.applyUsers.forEach(e => {
          this.usersTem.push({ 'projectname': res.projectname, 'skills': res.skills })
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
            })
            temp = inf.data()
            if (this.cont != this.usersTem.length) {
              this.usersTem[this.cont].name = temp.name + ' ' + temp.lastname
              this.usersTem[this.cont].photo = temp.photoUrl
              this.usersTem[this.cont].idOther = e
              this.usersTem[this.cont].noRead = t2
              this.cont++
              let obj = {};
              this.users = this.usersTem.filter(o => obj[o.idOther] ? false : obj[o.idOther] = true);
              this.info.chatUnread.emit(this.users.length)
            }
          })
        })
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
                          if (this.cont != this.users.length) {
                            this.users[this.cont].projectname = h.data().projectname
                            this.users[this.cont].idProject = h.id
                            this.cont++
                            this.info.chatUnread.emit(this.users.length)
                          }
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
        this.info.chatUnread.emit(this.users.length)
      })

    this.info.chatUnread.subscribe((d: number) => {
      var temp: number = 0
      var key: any = ''
      var i: any = ''
      if (localStorage.getItem('key')) {
        key = localStorage.getItem('key').split('|')
        if (this.info.user.displayName == 'hire') {
          i = key[1]
        } else {
          i = key[0]
        }
        this.users.map((m) => {
          if (m.idOther == i) {
            this.initChat(m)
          }
        })
      }
      this.users.map((m) => {
        if (!m.noRead) {
          temp++
        }
      })
      this.totalUnread = temp
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
    this.skills = e.skills
    this.idProject = e.idProject
    this.chat = true
    if (localStorage.getItem('key')) {
      localStorage.removeItem('key')
    }

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
            this.word = this.messages[this.messages.length - 1].accept ? 'Accepted' : 'Accept'
            this.disabled = this.messages[this.messages.length - 1].offer ? false : true
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
    this.info.chatUnread.emit(this.users.length)

    //  Jquery para responsive

    if ($(window).width() < 471) {
      $('.chatrightborder').hide()
      $('.col-8').show()
    }

  }

  chatMessage(e: string, msg: string, adj?: boolean, nameAdj?: string, offer?: boolean, accept?: boolean, price?: number, proname?: string, team?: string, projectId?: string) {
    var hire: string = ''
    var pro: string = ''
    if (msg != '') {
      if (this.info.user.displayName == 'hire') {
        hire = this.info.user.uid
        pro = e
        this.folder = this.info.getInfoPro()
      } else {
        hire = e
        pro = this.info.user.uid
        this.folder = this.info.getInfoHire()
      }
      this.folder.doc(e).get().subscribe((s) => {
        if (s.data().notifications) {
          this.tempNotify = s.data().notifications
        }
      })
      if (this.messages.length > 0) {
        if (this.messages[this.messages.length - 1].offer && msg != 'offer') {
          offer = true
          price = this.messages[this.messages.length - 1].price
          team = this.messages[this.messages.length - 1].team
          projectId = this.messages[this.messages.length - 1].projectId
        }else{
          this.tempNotify.push({ 'id': e + 'offer', 'name': this.name, 'project': this.projectName, 'img': this.photo, 'type': 'offer', date: new Date() })
          this.updateNotify(e)
        }
      }
      if (accept == true) { offer = false }

      this.info.chatMsg(hire, pro, msg, adj, nameAdj, offer, accept, price, proname, team, projectId)
      this.tempNotify.push({ 'id': e + 'chat', 'name': this.name, 'project': this.projectName, 'img': this.photo, 'type': 'chat', date: new Date() })
      this.updateNotify(e)
      this.mesg = ''
      $(".chatContainerHeight").animate({ scrollTop: $('.chatContainerHeight').prop("scrollHeight") }, 1000);
    }
  }
  updateNotify(e){
    this.folder.doc(e).update({
      'notifications': this.tempNotify
    })
  }
  adjFile(e: any) {
    var hire: string = ''
    var pro: string = ''
    if (this.info.user.displayName == 'hire') {
      hire = this.info.user.uid
      pro = this.idPro
    } else {
      hire = this.idPro
      pro = this.info.user.uid
    }
    this.info.addFileAdj(e, hire, pro)
    this.info.adjFile.subscribe((url) => {
      this.chatMessage(this.idPro, url, true, e.target.files[0].name.toLowerCase())
    })
  }

  filter(num: number) {
    if (num == 1) {
      this.unread = false
    } else {
      this.unread = true
    }
  }

  createOffer(price: number) {
    this.chatMessage(this.idPro, 'offer', false, '', true, false, price, this.name, this.skillS, this.idProject)
  }

  acceptOffer() {
    if (this.messages[this.messages.length - 1].offer) {
      this.skillS = this.messages[this.messages.length - 1].team
      this.priceHour = this.messages[this.messages.length - 1].price
      this.idProject = this.messages[this.messages.length - 1].projectId
      this.chatMessage(this.idPro, 'accept', false, '', false, true, this.priceHour, this.name, this.skillS)
      this.info.getInfoHire().doc(this.idPro).collection('projects').doc(this.idProject).get()
        .toPromise().then((p) => {
          if (p.data().negotiation) {
            this.negotiation = p.data().negotiation
          }
          if (p.data().applyUsers2) {
            this.applyusers = p.data().applyUsers2
          }
        }).then(() => {
          this.negotiation.push({
            idPro: this.myId,
            negotiation: true,
            priceHour: this.priceHour,
            skill: this.skillS
          })
          var i = this.applyusers.indexOf(this.myId)
          i !== -1 && this.applyusers.splice(i, 1)
        }).then(() => {
          this.info.getInfoHire().doc(this.idPro).collection('projects').doc(this.idProject).update({
            'negotiation': this.negotiation,
            'applyUsers2': this.applyusers,
            'status': 2,
            'statusname': 'Active'
          })
        })
    }
  }

  projectsFind() {
    this.skillS = ''
    this.showProjects = []
    this.projectsUsers.map((m) => {
      m.usersPro.map((n) => {
        if (n == this.idPro) {
          this.showProjects.push(m)
          if (this.showProjects.length == 1) {
            this.projectS = this.showProjects[0].projectName
            this.idProject = this.showProjects[0].idProject
          } else {
            this.projectS = ''
            this.idProject = ''
          }
        }
      })
    })
  }

  deleteChat() {
    var hire: string = ''
    var pro: string = ''
    if (this.info.user.displayName == 'hire') {
      hire = this.info.user.uid
      pro = this.infoTemp.idOther
    } else {
      hire = this.infoTemp.idOther
      pro = this.info.user.uid
    }
    this.info.getChat(hire, pro).delete().then(() => {
      location.reload()
    })
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
