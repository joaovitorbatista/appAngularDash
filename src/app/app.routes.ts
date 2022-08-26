import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { SobreNosComponent } from './view/sobre-nos/sobre-nos.component';
import { NovoClienteComponent } from './view/clientes/novo-cliente/novo-cliente.component';
import { VerClientesComponent } from './view/clientes/ver-clientes/ver-clientes.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home'
    }
  },
  {
    path: 'sobre-nos',
    component: SobreNosComponent,
    data: {
      title: 'Sobre Nós'
    },
  },
  {
    path: 'clientes/novo-cliente',
    component: NovoClienteComponent,
    data: {
      title: 'Novo Cliente'
    },
  },
  {
    path: 'clientes/ver-clientes',
    component: VerClientesComponent,
    data: {
      title: 'Ver Clientes'
    },
  },
];
