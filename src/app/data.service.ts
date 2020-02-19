import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://ec2-13-52-178-200.us-west-1.compute.amazonaws.com";

  constructor(private httpClient: HttpClient) { }

  public login (data) {
    return this.httpClient.post(`${this.REST_API_SERVER}/login`, data);
  }

  public checkAvailability (data) {
    return this.httpClient.post(`${this.REST_API_SERVER}/flight-insurance/availability`, data, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      )
    });
  }

  public booking (data) {
    return this.httpClient.post(`${this.REST_API_SERVER}/flight-insurance`, data, {
      headers: new HttpHeaders(
        {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`
        }
      )
    });
  }
}