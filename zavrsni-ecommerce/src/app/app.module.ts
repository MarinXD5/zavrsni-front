import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HelpComponent } from './components/help/help.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AuthService } from './services/auth.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { RoleGuard } from './core/guards/role.guard';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { CheckOutFormHelpComponent } from './components/check-out-form-help/check-out-form-help.component';
import { CardInfoFormHelpComponent } from './components/card-info-form-help/card-info-form-help.component';


const routes: Routes = [
  { path: 'card-help', component: CardInfoFormHelpComponent},
  { path: 'form-help', component: CheckOutFormHelpComponent},
  { path: 'order-history', component: OrderHistoryComponent},
  { path: 'verify-email', component: VerifyEmailComponent},
  { path: 'reset-password', component: ForgotPasswordComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'checkout', component: CheckoutComponent},
  { path: 'add-product', component: AddProductComponent, canActivate: [RoleGuard]},
  { path: 'edit-product/:id', component: EditProductComponent, canActivate: [RoleGuard]},
  { path: 'about-us', component: AboutUsComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'help', component: HelpComponent},
  { path: 'cart-details', component: CartDetailsComponent},
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'search/:keyword', component: ProductListComponent },
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    AddProductComponent,
    CartStatusComponent,
    CartDetailsComponent,
    AboutUsComponent,
    ContactUsComponent,
    HelpComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    UpdateProductComponent,
    EditProductComponent,
    OrderHistoryComponent,
    CheckOutFormHelpComponent,
    CardInfoFormHelpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgbModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    AuthModule.forRoot({
      domain: 'dev-gumhee1zxgvdei6o.us.auth0.com',
      clientId: 'Uaxgrtoga5oWWJYeZ3xRjDNisMMhNDL9',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
  ],
  providers: [ProductService, AuthService ],
  bootstrap: [AppComponent],
})
export class AppModule {}
