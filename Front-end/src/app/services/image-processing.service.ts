import { Injectable } from '@angular/core';
import { Dish } from '../model/dish.model';
import { FileHandle } from '../model/fileHandle.model';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }


public generateImage(dish:Dish){
     const dishImages:any[]=dish.dishImages;
     const dishImgFileHandle:FileHandle[]=[];
     console.log(dish);

     for(let i = 0; i < dishImages.length; i++ ){
      const imgFileData=dishImages[i];

        const imgBlob=this.uriToBlob(imgFileData.bytes, imgFileData.imageType);

        const imgFile=new File([imgBlob], imgFileData.imageName, {type:imgFileData.imageType});

        
        const fileHandle: FileHandle={
          file: imgFile,
          url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imgFile)) 

        };

        dishImgFileHandle.push(fileHandle);
      }
     
     dish.dishImages=dishImgFileHandle;

     return dish;
}


  public uriToBlob(picBytes:any, imgType:any){
    const byteString=window.atob(picBytes);
  
    const arrayBuffer=new ArrayBuffer(byteString.length);

    const int8array=new Uint8Array(arrayBuffer);
    for(let i=0; i<byteString.length; i++){
      int8array[i]=byteString.charCodeAt(i);
    }

    const blob=new Blob([int8array], {type:imgType});
    return blob;
  
  }



}
