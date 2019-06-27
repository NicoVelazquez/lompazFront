import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LandingComponent} from './landing/landing.component';
import {AppRoutingModule} from './app-routing.module';
import {NavComponent} from './nav/nav.component';
import {FooterComponent} from './footer/footer.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductCardComponent} from './product-list/product-card/product-card.component';
import {SignInComponent} from './nav/sign-in-up/sign-in/sign-in.component';
import {SignInUpComponent} from './nav/sign-in-up/sign-in-up.component';
import {SignUpComponent} from './nav/sign-in-up/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {AuthService} from './shared/services/auth.service';
import {EditBannerComponent} from './admin-settings/manage-banners/edit-banner/edit-banner.component';
import {ProductEditComponent} from './product-detail/product-edit/product-edit.component';
import {MenuComponent} from './menu/menu.component';
import {CartComponent} from './menu/cart/cart.component';
import {FavoritesComponent} from './menu/favorites/favorites.component';
import {OrdersComponent} from './menu/orders/orders.component';
import {MenuProfileComponent} from './menu/menu-profile/menu-profile.component';
import {AdminSettingsComponent} from './admin-settings/admin-settings.component';
import {ManageProductsComponent} from './admin-settings/manage-products/manage-products.component';
import {ManageCategoriesComponent} from './admin-settings/manage-categories/manage-categories.component';
import {ManageBannersComponent} from './admin-settings/manage-banners/manage-banners.component';
import {StarRatingModule} from 'angular-star-rating';
import {CommentsComponent} from './product-detail/comments/comments.component';
import {AddCommentComponent} from './product-detail/comments/add-comment/add-comment.component';
import {SearchBarComponent} from './nav/search-bar/search-bar.component';
import {SortPipe} from './shared/pipes/sort.pipe';
import {ProductListFilteredComponent} from './product-list-filtered/product-list-filtered.component';


import {AngularFireModule} from '@angular/fire/';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';


import {environment} from '../environments/environment';
import { CheckoutResponseComponent } from './checkout-response/checkout-response.component';

export const firebaseConfig = environment.firebaseConfig;


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NavComponent,
    FooterComponent,
    ProductListComponent,
    ProductCardComponent,
    SignInComponent,
    SignInUpComponent,
    SignUpComponent,
    ProductDetailComponent,
    ManageBannersComponent,
    EditBannerComponent,
    ProductEditComponent,
    MenuComponent,
    CartComponent,
    FavoritesComponent,
    OrdersComponent,
    MenuProfileComponent,
    AdminSettingsComponent,
    ManageProductsComponent,
    ManageCategoriesComponent,
    CommentsComponent,
    AddCommentComponent,
    SearchBarComponent,
    SortPipe,
    ProductListFilteredComponent,
    CheckoutResponseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    StarRatingModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
