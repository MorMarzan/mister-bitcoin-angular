import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ContactService } from '../services/contact.service';
import { Contact } from '../models/contact.model';
import { delay, finalize } from 'rxjs';

export const contactResolver: ResolveFn<Contact> = (route, state) => {
  const id = route.params['id']
  return inject(ContactService).getContactById(id).pipe(delay(100))
};
