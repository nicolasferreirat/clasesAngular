import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

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

  async getAllTask() {
    const response = await fetch('/back/tareas');
    const tasks = await response.json();
    return tasks;
  }

  async post<T = any>(id_usuario: string, body: string): Promise<T> {
    try {
      const response = await fetch(
        `${this.baseUrl}/usuarios/${id_usuario}/tareas`,
        {
          //
          method: 'POST',
          headers: this.getHeaders(),
          body: body,
        },
      );
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
}
