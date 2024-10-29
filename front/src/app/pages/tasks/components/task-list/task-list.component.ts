import { Component, inject, OnInit } from '@angular/core';
import { TasksService } from '../../../../services/tasks.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'], // Corrige el nombre del campo aquí
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; // Cambia el tipo de `any` a tu tipo de tarea específico si lo tienes
  errorMessage: string | null = null;
  tasksService: TasksService = inject(TasksService);
  ngOnInit() {
    this.loadTasks();
  }
  async loadTasks() {
    try {
      this.tasks = await this.tasksService.getAllTasks();
      this.errorMessage = null; // Limpiar el mensaje de error si la carga es exitosa
    } catch (error) {
      if (error instanceof Error) {
        this.errorMessage = 'Error al cargar las tareas: ' + error.message;
      } else {
        this.errorMessage = 'Error al cargar las tareas: ' + String(error);
      }
    }
  }
}
