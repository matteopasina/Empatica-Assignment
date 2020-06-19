import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  logoImage: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.logoImage = 'url(\'../../../../../assets/svg/empatica_logo_red.svg\')';
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  goToStats() {
    this.router.navigate(['stats']);
  }

}
