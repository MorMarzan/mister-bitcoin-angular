import { AbstractControl } from "@angular/forms";
import { debounceTime, first, map, switchMap, timer } from "rxjs";
import { ContactService } from "../services/contact.service";

export function notEnglishLetter(control: AbstractControl) {
    const isOnlyLetters = (/^[a-zA-Z ]*$/ig).test(control.value)
    return !isOnlyLetters ? { notEnglishLetter: true } : null
}

export function nameTaken(contactService: ContactService, contactId: String | null) {
    console.log('contactId', contactId)
    return (control: AbstractControl) => {
        return timer(1000).pipe(
            debounceTime(500),
            switchMap(() => contactService.contacts$.pipe(first())),
            map(contacts =>
                contacts.some(contact =>
                    (contact.name === control.value) && (!contactId || contact._id !== contactId)) ? { nameTaken: true } : null)
        )
    }
}
