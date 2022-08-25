import { Routes } from '@angular/router';
import { HomeComponent } from './view/home/home.component';
import { SobreNosComponent } from './view/sobre-nos/sobre-nos.component';

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
];
