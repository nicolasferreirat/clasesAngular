import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { TasksPage } from './pages/tasks/tasks.page';
import { LoginPage } from './pages/auth/login/login.page';
import { logueadoGuard } from './guards/logueado.guard';
import { RegistroUsuarioPage } from './pages/registro-usuario/registro-usuario.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [logueadoGuard],
  },
  {
    path: 'auth/login',
    component: LoginPage,
  },
  {
    path: 'tasks',
    component: TasksPage,
    canActivate: [logueadoGuard],
  },
  {
    path: 'registro',
    component: RegistroUsuarioPage,
  },
];
