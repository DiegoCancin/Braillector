import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import {HttpResponses} from "../../interfaces/http-responses";
import { FileUploader } from 'ng2-file-upload';

@Component({
    selector: 'app-braillector-standard',
    templateUrl: './braillector-standard.component.html',
    styleUrl: './braillector-standard.component.scss'
})
export class BraillectorStandardComponent implements OnInit {
    @ViewChild('res', {static: true}) res!: ElementRef;

    constructor(private consultasService: ConsultasService) {
    }

    ngOnInit(): void {

    }

    enviarConversion(txt: string) {
        const field = document.querySelector('.input')

        this.consultasService.enviaConversion(txt).subscribe({
            next: (response: HttpResponses) => {
                if (response.message.trim() === '') {
                    this.res.nativeElement.innerText = 'Ingrese texto en el campo de arriba...';
                } else {
                    this.res.nativeElement.innerText = response.message;
                    console.log(response.message);
                }

            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log("Finalizado");
            }
        });
    };

    clear(){
        this.res.nativeElement.innerText = '';
    }

}
