import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiRestService {
  readonly baseUrl = 'http://localhost/back/';

  token?: string;

  setToken(token: string) {
    this.token = token;
  }

  isValidUser(): boolean {
    return !!this.token;
  }

  private getHeaders(): HeadersInit {
    if (this.token) {
      return {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      };
    } else {
      return {
        'Content-Type': 'application/json',
      };
    }
  }

  async post<T = any>(url: string, body: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${url}`, {
        //
        method: 'POST',
        headers: this.getHeaders(),
        body: body,
      });
      const data = await response.json();
      //Si la respuesta del data es okay
      if (response.ok) {
        return data;
      } else {
        //Devolvemos el error
        throw new Error(data);
      }
    } catch (error) {
      throw error;
    }
  }

  constructor() {}
}
