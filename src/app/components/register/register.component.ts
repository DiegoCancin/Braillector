import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {LoginRequest, LoginResponse, RegisterRequest} from "../../interfaces/http-responses";
import {ConsultasService} from "../../services/consultas.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})

export class RegisterComponent implements OnInit{
    registerForm!: FormGroup;
    registerObject!: RegisterRequest;

    constructor(private consultasService: ConsultasService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            firstName: [null],
            paLastName:  [null],
            maLastName:  [null],
            email: [null],
            password:  [null]
        })
    }

    registerUsr() {
        this.registerObject = this.registerForm.value;
        this.consultasService.register(this.registerObject).subscribe({
            error: (error: any) => {
                console.log(error);
                alert("Favor de llenar todos los campos");
            },
            complete: () => {
                alert("Usuario Creado Exitosamente");
                this.router.navigate(['/basic'])
                console.log("Finalizado");
            }
        });
    };
}
