import { HostBinding, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component'
import { HomeComponent } from './pages/home/home.component'
import { StatisticsComponent } from './pages/statistics/statistics.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent },
  {
    path: 'contact', component: ContactIndexComponent, children: [
      // { path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver } },
      // { path: 'edit', component: ContactEditComponent },
    ]
  },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    // canActivate: [authGuard],
    // resolve: { contact: contactResolver }
  },
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: PageDontExist }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // @HostBinding('class') class = 'main-layout full'
}
