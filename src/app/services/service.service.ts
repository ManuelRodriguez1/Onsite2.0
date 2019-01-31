import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from "angularfire2/database";
import { Pro } from "../Model/model";

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  pro: AngularFireList<any>
  selectPro: Pro = new Pro();
  datoTest: any

  constructor(private afd: AngularFireDatabase) { }

  insertPro(data: Pro){
    this.pro.push({
      name: data.name,
      lastname: data.lastname,
      phone: data.phone,
      email: data.email,
      user: data.user,
      password: data.password,
      cityZipcode: data.cityZipcode,
      skills: data.skills,
      specificSkills: data.specificSkills,
      link: data.link,
      customer: data.customer,
      message: data.message
    })
  }

  guardarData(e){
    this.datoTest = e
  }

  devolverData(){
    return this.datoTest
  }

}
