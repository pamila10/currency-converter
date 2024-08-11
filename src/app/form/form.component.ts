import { Component, Input} from '@angular/core';
import { NgIf, NgForOf, DecimalPipe } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ICurrency } from '../models/currency';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DecimalPipe,
    ReactiveFormsModule
  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})


export class FormComponent {
  resultText: string = 'Result:';
  @Input() currency: ICurrency
  @Input() currencyData: any = {}
  @Input() currencyCodes: string[]

  form: FormGroup = new FormGroup({
    amount: new FormControl(null, Validators.required),
    from: new FormControl(null, Validators.required),
    to: new FormControl(null, Validators.required),
  });

  convert(amount: number, from: string, to: string): number {
    let fromConversionCoefficient: number = this.currencyData[from];
    let toConversionCoefficient: number = this.currencyData[to];
    return (toConversionCoefficient / fromConversionCoefficient) * amount;
  }

  getConvertedValue (fromValue: string, toValue: string) {
    let result = this.convert(1, fromValue, toValue);
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
