import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ManageBannersComponent} from './manage-banners/manage-banners.component';
import {ProductEditComponent} from './product-detail/product-edit/product-edit.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {MenuComponent} from './menu/menu.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: LandingComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'product/:id/edit', component: ProductEditComponent},
  {path: 'manage/banners', component: ManageBannersComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile/:id/edit', component: EditProfileComponent},
  {path: 'profile', component: MenuComponent},
  {path: 'cart', component: MenuComponent},
  {path: 'favorites', component: MenuComponent},
  {path: 'orders', component: MenuComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
