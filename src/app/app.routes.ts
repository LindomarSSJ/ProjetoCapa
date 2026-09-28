import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ExploreComponent } from './pages/explore/explore.component';
import { DetailComponent } from './pages/detail/detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
 

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'explorar', component: ExploreComponent },
  { path: 'explorar/:id', component: DetailComponent },
  { path: 'contato', component: ContactComponent }, 
  { path: 'sobre', component: AboutComponent },
  { path: '**', component: NotFoundComponent }
];