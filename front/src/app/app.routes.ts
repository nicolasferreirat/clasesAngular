import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { TasksPage } from './pages/tasks/tasks.page';
import { TaskIdPage } from './pages/tasks/components/task-id/task-id.page';
import { LoginPage } from './pages/auth/login/login.page';
import { logueadoGuard } from './guards/logueado.guard';
import { TaskComponent } from './componentes/task/task.component';
import { TaskFormComponent } from './pages/tasks/components/task-form/task-form.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginPage,
  },
  {
    path: 'tasks',
    component: TasksPage,
    //canActivate: [logueadoGuard],
  },
  {
    path: 'tasks/crear',
    component: TaskFormComponent,
  },
  {
    path: 'tasks/:id_tarea',
    component: TaskIdPage,
  },
];
