import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenUrlComponent } from './forbidden-url/forbidden-url.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthenticateGuard } from './authenticate.guard';
import { AddDishComponent } from './add-dish/add-dish.component';
import { DisplayDishesComponent } from './display-dishes/display-dishes.component';
import { OrderDishComponent } from './order-dish/order-dish.component';
import { ForuserGuard } from './foruser.guard';
import { DishResolverService } from './services/dish-resolver.service';
import { OrderDishResolverService } from './services/order-dish-resolver.service';
import { ViewDishDetailsComponent } from './view-dish-details/view-dish-details.component';
import { OrderConfirmedComponent } from './order-confirmed/order-confirmed.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { CartComponent } from './cart/cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ViewAllOrdersComponent } from './view-all-orders/view-all-orders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'admin', component: AdminComponent, canActivate:[AuthenticateGuard] },
  { path: 'forbidden', component: ForbiddenUrlComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent } ,
  { path: 'signup', component:SignupComponent},
  {path: 'addDish', component:AddDishComponent, resolve: {
    dish: DishResolverService
  }},
  {path:'displayDishes', component:DisplayDishesComponent},
  {path:'orderDish', component:OrderDishComponent, canActivate:[ForuserGuard],
  resolve: {
    dishDetails: OrderDishResolverService
  }
},
{path:"viewDishDetails", component:ViewDishDetailsComponent, resolve:{ dish:DishResolverService}},
{path: "orderConfirmed", component:OrderConfirmedComponent, canActivate:[ForuserGuard]},
{path: "cart", component: CartComponent},
{path: "myOrders", component:MyOrdersComponent, canActivate:[ForuserGuard]},
{path: "viewOrders", component: ViewAllOrdersComponent,canActivate: [AuthenticateGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
