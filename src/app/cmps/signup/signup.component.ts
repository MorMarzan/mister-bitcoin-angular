import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { notEnglishLetter } from '../../validators/contact.validators';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @Output() sign = new EventEmitter()
  private fb = inject(FormBuilder)

  form!: FormGroup
  contact: Partial<User> = { name: '' }

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, notEnglishLetter]]
    })
  }

  onSignup() {
    this.sign.emit(this.form.value.name)
  }

}
