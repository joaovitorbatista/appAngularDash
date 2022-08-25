import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';

import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './view/home/home.component';
import { NavComponent } from './layout/nav/nav.component';
import { SobreNosComponent } from './view/sobre-nos/sobre-nos.component';
import { NovoClienteComponent } from './view/clientes/novo-cliente/novo-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NavComponent,
    SobreNosComponent,
    NovoClienteComponent,
  ],
  imports: [
    TooltipModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTooltipModule,
    [RouterModule.forRoot(routes, { useHash: false })],
  ],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }, Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
