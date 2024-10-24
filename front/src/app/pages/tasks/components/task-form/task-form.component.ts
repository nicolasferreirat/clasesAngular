import { Component, inject, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskPost } from '../../../../componentes/interfaces/task';
import { JsonPipe } from '@angular/common';
import { TakenDirective } from '../../../../directives/taken.directive';
import { TasksService } from '../../../../services/tasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule, JsonPipe, TakenDirective],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  private tasksService: TasksService = inject(TasksService);
  private router: Router = inject(Router);

  public task: TaskPost = { duracion: 0, nombre: '' };
  public save = output<TaskPost>();

  id_usuario: string = '2'; //idUsuario hardcodeado, hay que sacar el id usuario real

  public async onSubmit(taskform: NgForm) {
    console.log('TASK:', this.task);

    if (taskform.valid) {
      const sent = await this.tasksService.post(
        this.id_usuario,
        JSON.stringify({
          nombre: this.task.nombre,
          duracion: this.task.duracion,
        }),
      );

      console.log(sent);
      this.tasksService.setToken(sent.token);
      this.router.navigate(['/tasks']);
      console.info('Task valid', taskform);
      return null;
    } else {
      console.error('Task no valid');
      return {
        taken: true,
      };
    }
  }
}
