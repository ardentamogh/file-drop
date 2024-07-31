import {  Component, ElementRef, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BackEndService } from '../../services/back-end.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-file-drop',
  templateUrl: './file-drop.component.html',
  styleUrls: ['./file-drop.component.scss']
})
export class FileDropComponent implements OnInit{
files:File[]= [];
selectedFile: File | any = null;
dragging: boolean = false;
filesUploaded:any = [];

constructor(private httpClient:HttpClient,private backendService:BackEndService,private el:ElementRef,
  private router:Router
){

}

ngOnInit():void {
  this.loadFiles();
  this.swipeActions();
}

onUpload() {
  this.backendService.uploadPdf(this.selectedFile).subscribe(res => {
    this.loadFiles();
  });
}

loadFiles() {
  this.backendService.getPdfs().subscribe(data => {
    this.filesUploaded = data;
    console.log(this.filesUploaded);
  });
}

generateFilesList() {
    for (const item of this.files) {
      if (item.type === "application/pdf") {
        this.uploadPdf(item);
      }
    }
}

uploadPdf(pdf: File) {
  this.backendService.uploadPdf(pdf).subscribe(res => {
    this.loadFiles();
  });
}

downloadPdf(id: string) {
  this.backendService.downloadPdf(id).subscribe(blob => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'download.pdf';
    link.click();
    window.URL.revokeObjectURL(url);
  });
}

onDrop(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  this.dragging = false;
  if(event.dataTransfer?.files){
    const newFiles = Array.from(event.dataTransfer.files);
    this.files = [...this.files, ...newFiles]; 
  }
}

onDragOver(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  this.dragging = true;
}

onDragLeave(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  this.dragging = false;
}


mousePosition = {
  x: 0,
  y: 0
};

swipeActions(){
  const button = this.el.nativeElement.querySelector('button');
  const mc = new Hammer(button);

  mc.on('swipeleft', () => {
    this.generateFilesList();
  });

  mc.on('swiperight', () => {
    this.generateFilesList();
  });
}

onMouseDown($event: MouseEvent) {
  this.mousePosition.x = $event.screenX;
  this.mousePosition.y = $event.screenY;
}

onClick($event: PointerEvent) {
  if (
    this.mousePosition.x === $event.screenX &&
    this.mousePosition.y === $event.screenY
  ) {
    this.generateFilesList();
  }
}

getStatus(){
  this.backendService.getStatus().subscribe((res:any) => {
    if(res.result){
      this.router.navigate(['/unauthorized']);
    }
  });
}

}
