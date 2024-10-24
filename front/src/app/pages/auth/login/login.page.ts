import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiRestService } from '../../../services/api-rest.service';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  private apiService: ApiRestService = inject(ApiRestService);
  private router: Router = inject(Router);

  credenciales = {
    username: '',
    password: '',
  };

  errorMessage: string = '';

  async login() {
    try {
      const response = await this.apiService.post(
        'auth/login',
        JSON.stringify(this.credenciales),
      );
      this.apiService.setToken(response.token);
      this.router.navigate(['/home']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes('401') || error.message.includes('404')) {
          this.errorMessage = 'Las credenciales son incorrectas.';
        } else {
          this.errorMessage =
            'Hubo un problema con la autenticación. Por favor, intenta de nuevo.';
        }
      } else {
        this.errorMessage =
          'Hubo un problema inesperado. Por favor, intenta de nuevo.';
      }
    }
  }
}
