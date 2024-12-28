import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {ConsultasService} from "../../services/consultas.service";
import {LoginResponse} from "../../interfaces/http-responses";

@Component({
  selector: 'app-upgrade-plan',
  templateUrl: './upgrade-plan.component.html',
  styleUrl: './upgrade-plan.component.scss'
})
export class UpgradePlanComponent {
    constructor(private consultasService: ConsultasService, private router: Router) {}

    userData: LoginResponse = JSON.parse(localStorage.getItem('userData')!);

    //private userId = 1;

    selectPlan(plan: string) {
        const planId = plan === 'Standard' ? 2 : 3;
        this.consultasService.updatePlan(this.userData.id, planId).subscribe({
            next: (response:LoginResponse) => {
                console.log(response);
                alert("Plan actualizado satisfactoriamente!");

                localStorage.setItem('userType', response.typeEntity.id.toString());
                localStorage.setItem('userData', JSON.stringify(response));

                console.log(response.typeEntity.id);

                if (response.typeEntity.id == 2) {
                    this.router.navigate(['/standard']);
                    return;
                }
                if (response.typeEntity.id == 3) {
                    this.router.navigate(['/premium']);
                    return;
                }
                    this.router.navigate(['/basic']);

               /*
                if (response.typeEntity.id == 2) {
                    this.router.navigate(['/standard']);
                }else if (response.typeEntity.id == 3) {
                    this.router.navigate(['/premium']);
                }else {
                    this.router.navigate(['/basic']);
                }
                */
            },
            error: (error) => {
                alert(error);
            },
            complete(): void {
            }
        });
    }

    goBack() {
        this.router.navigate(['/basic']);
    }
}
