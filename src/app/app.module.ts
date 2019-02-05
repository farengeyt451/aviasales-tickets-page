import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { IndexPageComponent } from './components/index-page';
import { TicketHeaderComponent } from './components/ticket-header';
import { TicketComponent } from './components/ticket';
import { FilterComponent } from './components/filter';
import { CurrencyFilterComponent } from './components/currency-filter';
import { TransfersFilterComponent } from './components/transfers-filter';
import { FooterComponent } from './components/shared/footer';

import { TicketsService } from './services/tickets.service';

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
  imports: [BrowserModule, AppRoutingModule],
  providers: [TicketsService],
  bootstrap: [AppComponent]
})
export class AppModule {}
