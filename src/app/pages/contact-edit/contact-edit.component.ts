import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameTaken, notEnglishLetter } from '../../validators/contact.validators';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
  host: {
    class: 'main-layout full'
  }
})
export class ContactEditComponent implements OnInit, OnDestroy {
  private router = inject(Router)
  private route = inject(ActivatedRoute)
  private fb = inject(FormBuilder)
  private contactService = inject(ContactService)

  destroySubject$ = new Subject<void>()
  form!: FormGroup
  contact: Partial<Contact> = this.contactService.getEmptyContact()

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, notEnglishLetter]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.route.data
      .pipe(map(data => data['contact']))
      .subscribe(contact => {
        if (contact) {
          this.contact = contact
          this.form.patchValue(contact)
        }
        this.setAsyncValidators(this.contact?._id || null)
      })
  }

  setAsyncValidators(contactId: string | null) {
    this.form.get('name')!.setAsyncValidators([
      nameTaken(this.contactService, contactId)
    ])
    this.form.get('name')!.updateValueAndValidity()
  }

  onSaveContact() {
    const petToSave = { ...this.contact, ...this.form.value } as Contact
    this.contactService.saveContact(petToSave)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: this.onBack,
        error: err => console.log('err:', err)
      })
  }

  onBack = () => {
    this.router.navigateByUrl('/contact')
  }

  ngOnDestroy(): void {
    this.destroySubject$.next()
  }

}
