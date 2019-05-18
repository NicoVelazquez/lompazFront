import {NgModule} from '@angular/core';

import {RouterModule, Routes} from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {ProductEditComponent} from './product-detail/product-edit/product-edit.component';
import {MenuComponent} from './menu/menu.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';
import {ProductListFilteredComponent} from './product-list-filtered/product-list-filtered.component';
import {AuthGuard} from './shared/guards/auth.guard';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: LandingComponent},
  {path: 'filtered', component: ProductListFilteredComponent},
  {path: 'product/:id', component: ProductDetailComponent},
  {path: 'product/:id/edit', component: ProductEditComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
  {path: 'profile', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'cart', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'favorites', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: MenuComponent, canActivate: [AuthGuard]},
  {path: 'manage/products', component: AdminSettingsComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
  {path: 'manage/categories', component: AdminSettingsComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
  {path: 'manage/banners', component: AdminSettingsComponent, canActivate: [AuthGuard], data: { roles: ['Admin']}},
  {path: '**', component: LandingComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
