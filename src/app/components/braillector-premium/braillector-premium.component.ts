import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import {HttpResponses} from "../../interfaces/http-responses";

@Component({
  selector: 'app-braillector-premium',
  templateUrl: './braillector-premium.component.html',
  styleUrl: './braillector-premium.component.scss'
})
export class BraillectorPremiumComponent implements OnInit {

    @ViewChild('res', { static: true }) res!: ElementRef;



    constructor(private consultasService: ConsultasService) {

    }

    ngOnInit(): void {

    }

    copyToClipboard(value: string) {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(value).then(() => {
            console.log('Texto copiado al portapapeles');
          }).catch(err => {
            console.error('Error al copiar al portapapeles', err);
          });
        } else {
          // Fallback para navegadores antiguos
          const textarea = document.createElement('textarea');
          textarea.value = value;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          console.log('Texto copiado usando el método de respaldo');
        }
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
