import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {

  public files: any[] = [];

  ngOnInit(): void {
    
  }

  constructor(){}

  onFileChange(pFileList: File[]){
    this.files = pFileList;
    
  }

  deleteFile(f){
    this.files = this.files.filter(function(w){ return w.name != f.name });
    
  }

}
