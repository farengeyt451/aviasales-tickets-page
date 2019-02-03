import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header';
import { FooterComponent } from './components/footer';
import { TicketComponent } from './components/ticket';
import { IndexPageComponent } from './components/index-page/index-page.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, TicketComponent, IndexPageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
