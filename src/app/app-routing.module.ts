import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProductListComponent} from "./product-list/product-list.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
