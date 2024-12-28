import {Component, OnInit} from '@angular/core';
import {FileUploader} from "ng2-file-upload";
import {ConsultasService} from "../../services/consultas.service";
import {LoginResponse} from "../../interfaces/http-responses";

@Component({
    selector: 'app-upload-files',
    templateUrl: './upload-files.component.html',
    styleUrl: './upload-files.component.scss'
})
export class UploadFilesComponent implements OnInit {

    uploader!: FileUploader;
    hasBaseDropZoneOver!: boolean;
    hasAnotherDropZoneOver!: boolean;
    response!: string;
    URL = 'http://localhost:8080/api/upload';
    countConversions: number = 0;
    userType:number = 0;
    userData!:LoginResponse;

    constructor(private consultasService: ConsultasService) {
        this.uploader = new FileUploader({
            url: this.URL,
            itemAlias: "file",
            disableMultipart: false,
            autoUpload: false
        })
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;

        this.response = '';

        this.uploader.onSuccessItem = (item, response, status, headers) => {
            this.downloadFile(response);
        }

        const userDataString:string | null= localStorage.getItem('userData');
        if (userDataString !== null) {
            this.userData = JSON.parse(userDataString);
        }

        this.userType = this.userData?.typeEntity.id
        console.log(this.userType)
        this.conversions()
    }

    ngOnInit(): void {
        this.uploader.onProgressItem = (fileItem, progress) => {
            console.log(progress);
            fileItem.progress = progress; // Actualizar el progreso manualmente
        };
    }


    downloadFile(response: any) {
        const blob = new Blob([response], {type: 'text/plain'});

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'braillectorOutput.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }

    registerConversions() {
        if (this.userData?.typeEntity.id != 3) {
            this.conversions()
        }
        this.consultasService.registerConversions(this.userData?.id).subscribe({
            next: (response: number) => {
                console.log(response);
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log("Finalizado")
                if (this.userData?.typeEntity.id != 3) {
                    this.conversions()
                }
            },
        });
    }

    conversions() {
        this.consultasService.conversions(this.userData?.id).subscribe({
            next: (response: number) => {
                this.countConversions = response;
                console.log(response);
                if (this.countConversions >= 5) {
                    alert("Paquetes")
                }
            },
            error: (error: any) => {
                this.countConversions = -1;
                console.log(error);
            },
            complete: () => {
                console.log("Finalizado");
            },
        });
    }
}
