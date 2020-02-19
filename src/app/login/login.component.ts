import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string;
  public password:string;
  public error:string = '';

  constructor(
    private router: Router,
    private dataService: DataService
    ) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      this.router.navigate(['/services']);
    }
  }


  login () {
    this.error = '';

    this.dataService.login({
      username: this.username,
      password: this.password
    }).subscribe((data: any)=> {
      const { token } = data;
      sessionStorage.setItem('user', JSON.stringify(data));
      sessionStorage.setItem('token', token);
      this.router.navigate(['/services']);
    }, error => {
      try {
        this.error = error.error.error
      } catch (e) {
        this.error = 'Server error'
      }
    })  
  }

}
