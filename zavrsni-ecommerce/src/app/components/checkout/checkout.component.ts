import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/orderitem';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { ShopFormService } from 'src/app/services/shop-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalQuantity: number = 0;
  totalPrice: number = 0.0;
  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];
  countries: Country[] = [];

  checkoutFormGroup!: FormGroup;
  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.iso2;

    this.shopFormService.getStates(countryCode).subscribe((data) => {
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      formGroup?.get('state')?.setValue(data[0]);
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private shopFormService: ShopFormService,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [
          Validators.required
        ]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
        state: new FormControl('', [
          Validators.required
        ]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      billingAddress: this.formBuilder.group({
        country: new FormControl('', [
          Validators.required
        ]),
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        state: new FormControl('', [
          Validators.required
        ]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
        ]),
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [
          Validators.required,
        ]),
        nameOnCard: new FormControl('', [
          Validators.required,
        ]),
        cardNumber: new FormControl('', [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(16)
        ]),
        securityCode: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(3)
        ]),
        expirationMonth: new FormControl('', [
          Validators.required,
        ]),
        expirationYear: new FormControl('', [
          Validators.required,
        ]),
      }),
    });

    const startMonth = 1;
    this.shopFormService.getCreditCardMonths(startMonth).subscribe((data) => {
      this.creditCardMonths = data;
    });

    this.shopFormService.getCreditCardYears().subscribe((data) => {
      this.creditCardYears = data;
    });

    this.shopFormService.getCountries().subscribe((data) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }

  get firstName() {return this.checkoutFormGroup.get('customer.firstName');}
  get lastName() {return this.checkoutFormGroup.get('customer.lastName');}
  get email() {return this.checkoutFormGroup.get('customer.email');}

  get shippingAddressCountry() {return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressStreet() {return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity() {return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState() {return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressZipCode() {return this.checkoutFormGroup.get('shippingAddress.zipCode');}

  get billingAddressCountry() {return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressStreet() {return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity() {return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState() {return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressZipCode() {return this.checkoutFormGroup.get('billingAddress.zipCode');}

  get creditCardType() {return this.checkoutFormGroup.get('creditCard.cardType');}
  get creditCardName() {return this.checkoutFormGroup.get('creditCard.nameOnCard');}
  get creditCardNumber() {return this.checkoutFormGroup.get('creditCard.cardNumber');}
  get creditCardSecurityCode() {return this.checkoutFormGroup.get('creditCard.securityCode');}
  get creditCardMonth() {return this.checkoutFormGroup.get('creditCard.expirationMonth');}
  get creditCardYear() {return this.checkoutFormGroup.get('creditCard.expirationYear');}

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }

  onSubmit() {
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('customer')?.value);

    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    let purchase = new Purchase();

    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    
    
    const shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;

    if (shippingAddress) {
    purchase.shippingAddress = shippingAddress;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress?.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress?.country));
    
    if (purchase.shippingAddress?.state) {
        purchase.shippingAddress.state = shippingState.name;
    }
    if (purchase.shippingAddress?.country) {
        purchase.shippingAddress.country = shippingCountry.name;
    }
}

    const billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;

    if (billingAddress){
      purchase.billingAddress = billingAddress;
      const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress?.state));
      const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress?.country));

      if (purchase.billingAddress?.state){
        purchase.billingAddress.state = billingState.name;
      }
      if (purchase.billingAddress?.country){
        purchase.billingAddress.country = billingCountry.name;
      }
    }

    purchase.order = order;
    purchase.orderItems = orderItems;

    this.checkoutService.placeOrder(purchase).subscribe(
      {
        next: response => {
          alert(`Your order has been received.\n Order tracking number: ${response.orderTrackingNumber}`);
          this.resetCart();
        },
        error: response => {
          alert(`Your order has not been received.\n Please check your information. Error message: ${response.message} `)
        }
      }
    );
  }

  updateCartStatus() {
    this.cartService.totalPrice.subscribe(data => this.totalPrice = data);

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  resetCart(){
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset();
    this.router.navigateByUrl("/products");

  }

  reviewCartDetails() {
    this.cartService.totalQuantity.subscribe(data =>
      this.totalQuantity = data);

    this.cartService.totalPrice.subscribe(data =>
      this.totalPrice = data);
  }
}