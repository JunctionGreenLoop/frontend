import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab4.page',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild('csvPicker', { static: false }) csvPickerRef: ElementRef<HTMLInputElement>;

  public companyNameMessage: string = null;
  public errorMessage: string = null;
  public matCsvFileInfo = null;
  public matCsvFile = null;

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

 onPickCsv() {

  this.csvPickerRef.nativeElement.click();
}

  public onCsvFileChange(event) {

    console.log(event);
  }

  onCsvChosen(event: Event) {

    const pickedFile = (event.target as HTMLInputElement).files[0];
    this.matCsvFileInfo = pickedFile;

    if (!pickedFile) {
      return;
    }

    console.log('Picked image successfully. TODO: store image.');
    console.log(pickedFile);

    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.matCsvFile = dataUrl;
      //this.imagePick.emit(pickedFile);
      console.log(this.matCsvFile);

      if (typeof this.matCsvFile === 'string') {
        try {
          // this.matCsvFile = this.base64toBlob(
          //   this.matCsvFile.replace('data:image/jpeg;base64,', ''),
          //   'image/jpeg'
          // );
        } catch (error) {
          console.log(error);
          return;
        }
      } else {
      }
    };
    fr.readAsDataURL(pickedFile);


  }

}
