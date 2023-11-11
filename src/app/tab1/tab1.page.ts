import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public phoneObj = null;
  public loadingData = false;

  constructor(
    public photoService: PhotoService,
    private http: HttpClient
  ) {}

  public searchPhone(event) {
    this.phoneObj = null;
    this.loadingData = true
    let phone = event.target.value;
    console.log(phone)
    this.http.get<any>("http://ec2-15-160-182-105.eu-south-1.compute.amazonaws.com:8080/api/getDeviceInfo?name="+phone.replace(" ",""))
    .subscribe((res) => {
      console.log(res);
      this.loadingData = false;
      this.phoneObj = res;
    }, (err) => {
      this.loadingData = false;
      console.error(err);
    }, )
  }

}
