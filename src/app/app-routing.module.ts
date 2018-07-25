import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductDetailComponent} from "./product-detail/product-detail.component";
import {ManageBannersComponent} from "./manage-banners/manage-banners.component";

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'manage/banners', component: ManageBannersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
