import { HostBinding, NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { ContactIndexComponent } from './pages/contact-index/contact-index.component'
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component'
import { HomeComponent } from './pages/home/home.component'
import { StatisticsComponent } from './pages/statistics/statistics.component'
import { contactResolver } from './resolvers/contact.resolver'
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: 'contact', component: ContactIndexComponent },
  { path: 'contact/edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver } },
  { path: 'contact/edit', component: ContactEditComponent },
  {
    path: 'contact/:id',
    component: ContactDetailsComponent,
    resolve: { contact: contactResolver }
  },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: HomeComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
  // @HostBinding('class') class = 'main-layout full'
}
