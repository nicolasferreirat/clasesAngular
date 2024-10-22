import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiRestService } from '../../../services/api-rest.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.page.html',
  styleUrl: './login.page.css',
})
export class LoginPage {
  //Obtenemos el valor de los inputs username y password.
  username: string = '';
  password: string = '';
  private apiService: ApiRestService = inject(ApiRestService);
  private router: Router = inject(Router);

  async onSubmit() {
    console.log('username:', this.username);
    console.log('password:', this.password);

    const sent = await this.apiService.post(
      'auth/',
      JSON.stringify({ username: this.username, contraseña: this.password }),
    );
    console.log(sent);
    this.apiService.setToken(sent.token);
    this.router.navigate(['/tasks']);
  }
}
