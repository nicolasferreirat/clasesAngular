import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Task } from '../../componentes/interfaces/task';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tasks.page.html',
  styleUrl: './tasks.page.css',
})
export class TasksPage implements OnInit {
  httpClient: HttpClient = inject(HttpClient);
  taskList: Task[] = [];
  async ngOnInit() {
    const tasks = await firstValueFrom(
      this.httpClient.get<Task[]>('/back/tareas'),
    );
    console.log(tasks);
  }
}
