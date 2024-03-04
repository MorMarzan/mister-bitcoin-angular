import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrl: './transfer-funds.component.scss'
})
export class TransferFundsComponent {
  @Input() contact!: Contact;
  @Input() set balance(value: number) {
    this._balance = value;
    this.initializeForm()
  }
  get balance(): number {
    return this._balance;
  }
  private _balance!: number;

  @Output() transfer = new EventEmitter<number>();
  private fb = inject(FormBuilder);

  form!: FormGroup;

  constructor() {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      sum: [null, [
        Validators.required,
        Validators.min(1),
        this.maxBalanceValidator()
      ]]
    });
  }

  maxBalanceValidator() {
    return (control: FormControl): { [key: string]: any } | null => {
      const input = control.value;
      return input > this.balance ? { maxBalance: true } : null;
    };
  }

  onTransfer() {
    this.transfer.emit(this.form.value.sum);
  }
}
