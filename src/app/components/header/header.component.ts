import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    showMenu: boolean = false;
    isButtonVisible: boolean = true;

    constructor(private router: Router) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const currentUrl = this.router.url;
                const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
                const userType = localStorage.getItem('userType');

                this.showMenu =
                    isLoggedIn && (
                        (currentUrl === '/basic' && userType === '1') ||
                        (currentUrl === '/standard' && userType === '2') ||
                        (currentUrl === '/premium' && userType === '3')
                    );
                const hiddenRoutes = ['/login', '/register', '/forgot-password'];
                this.isButtonVisible = !isLoggedIn && !hiddenRoutes.includes(currentUrl);
            }
        });
    }

    ngOnInit(): void {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        this.isButtonVisible = !isLoggedIn;
    }

    logout() {
        console.log('Cerrando sesión...');
        localStorage.setItem('userType', '0');
        localStorage.clear();
        sessionStorage.clear();

        this.router.navigate(['/basic']).then(() => {
            window.location.reload();
        });
    }
}
