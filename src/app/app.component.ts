import { CurrencyService } from './services/currency.api.service';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ICurrency } from './models/currency';
import { FormComponent } from "./form/form.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    FormComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  title: string = 'currency-converter';
  resultText: string = 'Result:';
  currency: ICurrency;
  currencyData: any = {};
  currencyCodes: string[];

  constructor(
    private currencyService: CurrencyService,
  ) {}

  ngOnInit() {
    this.currencyService.getApiData().subscribe(currency => {
      this.currency = currency
      this.currencyData = currency.rates
      this.currencyCodes = Object.keys(this.currencyData).sort()
    })
  }
}