import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import {HttpResponses, LoginResponse} from "../../interfaces/http-responses";

@Component({
    selector: 'app-braillector-basic',
    templateUrl: './braillector-basic.component.html',
    styleUrl: './braillector-basic.component.scss'
})
export class BraillectorBasicComponent implements OnInit {

    @ViewChild('res', {static: true}) res!: ElementRef;

    conversionCount = 0; // Contador para las conversiones
    showUpgrade = false; // Controla la visibilidad del botón para mejorar el plan

    constructor(private consultasService: ConsultasService) {
    }

    ngOnInit(): void {

    }

    enviaConversion(txt: string) {
        const field = document.querySelector('.input')

        this.consultasService.enviaConversion(txt).subscribe({
            next: (response: HttpResponses) => {
                if (response.message.trim() === '') {
                    this.res.nativeElement.innerText = 'Ingrese texto en el campo de arriba...';
                } else {
                    this.res.nativeElement.innerText = response.message;
                    console.log(response.message);

                    // Incrementar el contador y mostrar el botón si llega a 5
                    this.conversionCount++;
                    if (this.conversionCount >= 5) {
                        this.showUpgrade = true;
                    }
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

    clear() {
        this.res.nativeElement.innerText = '';
    }

    mejorarPlan() {
        console.log("Mejorar a plan premium");
        // Aquí podrías implementar redirección o lógica adicional
    }
}
