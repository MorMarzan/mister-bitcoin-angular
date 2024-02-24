import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss',
  host: {
    class: 'main-layout full '
  }
})
export class ContactEditComponent implements OnInit {
  destroySubject$ = new Subject<void>()
  router = inject(Router)
  route = inject(ActivatedRoute)


  contactService = inject(ContactService)
  contact = this.contactService.getEmptyContact()

  ngOnInit(): void {
    this.route.data
      .pipe(
        map(data => data['contact']),
        filter(contact => contact)
      )
      .subscribe(contact => this.contact = contact)
  }

  onSaveContact() {
    // console.log('this.contact:', this.contact)
    this.contactService.saveContact(this.contact as Contact)
      .pipe(takeUntil(this.destroySubject$))
      .subscribe({
        next: this.onBack,
        error: err => console.log('err:', err)
      })
  }

  onBack = () => {
    this.router.navigateByUrl('/contact')
  }



}
