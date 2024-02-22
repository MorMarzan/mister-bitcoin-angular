import { Component, inject } from '@angular/core';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { Observable, Subscription, take } from 'rxjs';

@Component({
  selector: 'contact-index',
  templateUrl: './contact-index.component.html',
  styleUrl: './contact-index.component.scss',
  host: {
    class: 'main-layout full'
  }
})
export class ContactIndexComponent {

  contactService = inject(ContactService)
  subscription!: Subscription
  contacts$: Observable<Contact[]> = this.contactService.contacts$

  onRemoveContact(contactId: string) {
    this.contactService.deleteContact(contactId)
      .pipe(take(1))
      .subscribe({
        error: err => console.log('err:', err),
      })

  }

}
