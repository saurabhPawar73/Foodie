import { NgModule, Injectable } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { ForbiddenUrlComponent } from './forbidden-url/forbidden-url.component';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AddDishComponent } from './add-dish/add-dish.component';
import {MatCardModule} from '@angular/material/card';
import { DisplayDishesComponent } from './display-dishes/display-dishes.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { OrderDishComponent } from './order-dish/order-dish.component';
import { ViewDishDetailsComponent } from './view-dish-details/view-dish-details.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    UserComponent,
    LoginComponent,
    HeaderComponent,
    ForbiddenUrlComponent,
    SignupComponent,
    AddDishComponent,
    DisplayDishesComponent,
    OrderDishComponent,
    ViewDishDetailsComponent,
    OrderConfirmedComponent,
    RegisteruserComponent,
    CartComponent,
    MyOrdersComponent,
    ViewAllOrdersComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatGridListModule, MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
