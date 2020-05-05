import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  text: any[] = ["Verification", "Email Change"];
  error: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  Continue(){
    this.router.navigate(["/Hireprincipal"]);
  }
}
