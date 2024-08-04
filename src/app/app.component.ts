import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    DecimalPipe, 
    FormsModule, 
    ReactiveFormsModule, 
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent implements OnInit {

  title: string = 'currency-converter';
  resultText: string = 'Result:';
  form: FormGroup;
  currencyData: any = {};
  currencyCodes = Object.keys(this.currencyData);

  constructor() {}

  ngOnInit() {
    this.form = new FormGroup({
      amount: new FormControl(null, Validators.required),
      from: new FormControl(null, Validators.required),
      to: new FormControl(null, Validators.required),
    });
    this.getData();
  }

  getData() {
    let myHeaders: any = new Headers();
    myHeaders.append('apikey', 'gTbk6PS7dKg2NmQhKAKux1UzK1yGWf17');

    let requestOptions: any = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders,
    };

    fetch(
      'https://api.apilayer.com/exchangerates_data/latest?symbols=USD%2CEUR%2CUAH%2&base=UAH',
      requestOptions
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Failed to fetch data');
        }
        return response.text();
      })
      .then((result) => {
        this.currencyData = JSON.parse(result).rates;
        this.currencyCodes = Object.keys(this.currencyData).sort();
      })
      .catch((err) => console.log(err.message));
  }

  convert(amount: number, from: string, to: string): number {
    let fromConversionCoefficient: number = this.currencyData[from];
    let toConversionCoefficient: number = this.currencyData[to];
    return (toConversionCoefficient / fromConversionCoefficient) * amount;
  }

  getEUR () {
    let result = this.convert(1, 'EUR', 'UAH');
    return result
  }

  getUSD() {
    let result = this.convert(1, 'USD', 'UAH');
    return result 
  }

  onSubmit() {
    if (this.form.valid) {
      let amount: number = parseFloat(this.form.get('amount')?.value);
      let convertFrom: string = this.form.get('from')?.value;
      let convertTo: string = this.form.get('to')?.value;
      let result = this.convert(amount, convertFrom, convertTo);
      result = parseFloat(result.toFixed(3));
      this.resultText = `Result: ${amount} ${convertFrom} = ${result} ${convertTo}`;
    }
  }
}