import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductCardComponent } from './product-list/product-card/product-card.component';
import { SignInComponent } from './nav/sign-in-up/sign-in/sign-in.component';
import { SignInUpComponent } from './nav/sign-in-up/sign-in-up.component';
import { SignUpComponent } from './nav/sign-in-up/sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {HttpClientJsonpModule, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./shared/services/auth.service";
import { ManageBannersComponent } from './manage-banners/manage-banners.component';
import { EditBannerComponent } from './manage-banners/edit-banner/edit-banner.component';

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
    EditBannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
