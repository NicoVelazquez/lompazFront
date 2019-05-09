import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-detail/product-edit/product-edit.component';
import {ProfileComponent} from './profile/profile.component';
import {EditProfileComponent} from './profile/edit-profile/edit-profile.component';
import {MenuComponent} from './menu/menu.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';
import {ProductListFilteredComponent} from './product-list-filtered/product-list-filtered.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: LandingComponent},
  {path: 'filtered', component: ProductListFilteredComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'product/:id/edit', component: ProductEditComponent},
  {path: 'profile/:id', component: ProfileComponent},
  {path: 'profile/:id/edit', component: EditProfileComponent},
  {path: 'profile', component: MenuComponent},
  {path: 'cart', component: MenuComponent},
  {path: 'favorites', component: MenuComponent},
  {path: 'orders', component: MenuComponent},
  {path: 'manage/products', component: AdminSettingsComponent},
  {path: 'manage/categories', component: AdminSettingsComponent},
  {path: 'manage/banners', component: AdminSettingsComponent},
  {path: '**', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
