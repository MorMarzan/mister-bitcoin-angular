import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription, map } from 'rxjs';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  host: {
    class: 'main-layout full '
  }
})
export class ContactDetailsComponent implements OnDestroy {

  private router = inject(Router)
  private route = inject(ActivatedRoute)

  destroySubject$ = new Subject<void>()
  subscription!: Subscription

  contact$ = this.route.data.pipe(map(data => data['contact']))
  isImgLoaded = false

  onImgLoad() {
    this.isImgLoaded = true
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  ngOnDestroy(): void {
    this.destroySubject$.next()
    this.destroySubject$.complete()
  }

}
