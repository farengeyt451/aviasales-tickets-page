import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// For global language settings
import { LOCALE_ID } from '@angular/core';

import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { IndexPageComponent } from './components/index-page';
import { TicketHeaderComponent } from './components/ticket-header';
import { TicketComponent } from './components/ticket';
import { FilterComponent } from './components/filter';
import { CurrencyFilterComponent } from './components/currency-filter';
import { TransfersFilterComponent } from './components/transfers-filter';
import { FooterComponent } from './components/shared/footer';

import { TicketsService } from './services/tickets.service';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    IndexPageComponent,
    TicketHeaderComponent,
    TicketComponent,
    FilterComponent,
    FooterComponent,
    CurrencyFilterComponent,
    TransfersFilterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],

  // For global language settings
  // providers: [TicketsService, { provide: LOCALE_ID, useValue: 'ru-RU' }],

  providers: [TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
