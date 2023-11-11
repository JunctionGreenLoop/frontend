import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab4.page',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  public companyNameMessage: string = null;
  public errorMessage: string = null;

  constructor(
    private http: HttpClient
    
  ) {}

  ngOnInit() {}

  onClickSubmit(result: { token: string; }) {
    this.companyNameMessage = null;
    this.errorMessage = null;
    this.http.get<any>("http://ec2-15-160-182-105.eu-south-1.compute.amazonaws.com:8080/api/checkCompanyByToken?token="+result.token)
    .subscribe((res) => {
      console.log(res);
      this.companyNameMessage = res['company']

    }, (err) => {
      
      console.error(err);
      this.errorMessage = "Not Valid Token"
    }, ) 
 }



}
