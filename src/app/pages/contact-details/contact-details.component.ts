import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, map } from 'rxjs';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  host: {
    class: 'main-layout full '
  }
})
export class ContactDetailsComponent implements OnDestroy, OnInit {

  private router = inject(Router)
  private route = inject(ActivatedRoute)
  user!: User | null

  destroySubject$ = new Subject<void>()
  subscription!: Subscription

  constructor(private userService: UserService) { }
  contact$ = this.route.data.pipe(map(data => data['contact']))
  isImgLoaded = false

  ngOnInit(): void {
    this.user = this.userService.getUser()
  }

  onImgLoad() {
    this.isImgLoaded = true
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  transfer(amount: number) {
    this.contact$.subscribe(contact => {
      if (contact) {
        this.userService.transferFunds({ name: contact.name, _id: contact._id }, amount)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroySubject$.next()
    this.destroySubject$.complete()
  }

}
