import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpResponses, LoginRequest, LoginResponse, RegisterRequest} from '../interfaces/http-responses';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConsultasService {

    public userData!: LoginResponse;

    constructor(private httpClient: HttpClient) {

    }

    enviaConversion(txt: string): Observable<HttpResponses> {
        return this.httpClient.get<HttpResponses>('http://localhost:8080/api/text-to-braille?texto=' + txt);
    }

    login(data: LoginRequest): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>('http://localhost:8080/api/login', data)
    }

    register(data: RegisterRequest): Observable<HttpResponses> {
        return this.httpClient.post<HttpResponses>('http://localhost:8080/api/save-user', data)
    }

    registerConversions(userId: number): Observable<number> {
        return this.httpClient.post<number>('http://localhost:8080/api/save-conversions?userId=' + userId, {})
    }

    conversions(userId: number): Observable<number> {
        return this.httpClient.get<number>('http://localhost:8080/api/conversions?userId=' + userId);
    }

    updatePlan(userId: number, planId: number): Observable<LoginResponse> {
        return this.httpClient.post<LoginResponse>(
            `http://localhost:8080/api/update-plan?userId=${userId}&planId=${planId}`, {});
    }
    // /home/diegox/Desktop/braillector-backend-0.0.1-SNAPSHOT.jar
}
