import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PhotoService } from '../services/photo.service';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public phoneObj = null;
  public loadingData = false;

  constructor(
    // public photoService: PhotoService,
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

  public async doImageDetection() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // file-based data; provides best performance
      source: CameraSource.Camera, // automatically take a new photo with the camera
      quality: 100, // highest quality (0 to 100)
    });

    this.phoneObj = null;
    this.loadingData = true

    // let pic = "data:image/png;base64,"+capturedPhoto.base64String;
    let pic = capturedPhoto.base64String;

    this.http.post<any>("https://testgreenlink.ddns.net/detectorApi", JSON.stringify({
      image: pic,
    }))
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
