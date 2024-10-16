import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor() {}

  async getAllTask() {
    const response = await fetch('/back/tareas');
    const tasks = await response.json();
    return tasks;
  }
}
