import {Component, OnInit} from '@angular/core';
import {ConsultasService} from "../../services/consultas.service";
import {HttpResponses, LoginRequest, LoginResponse} from "../../interfaces/http-responses";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loginObject!: LoginRequest;

    constructor(private consultasService: ConsultasService, private formBuilder: FormBuilder, private router: Router) {
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: [''],
            password: ['']
        })
    }

    login() {
        this.loginObject = this.loginForm.value;
        this.consultasService.login(this.loginObject).subscribe({
            next: (response: LoginResponse) => {
                this.consultasService.userData = response;

                // Guardar los datos del usuario en localStorage
                localStorage.setItem('userType', response.typeEntity.id.toString());
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userData', JSON.stringify(response));

                // Redireccionar según el tipo de usuario
                if (response.typeEntity.id === 3) {
                    this.router.navigate(['/premium']);
                } else if (response.typeEntity.id === 2) {
                    this.router.navigate(['/standard']);
                } else if (response.typeEntity.id === 1) {
                    this.router.navigate(['/basic']);
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log("Finalizado");
            }
        });
    }

}
