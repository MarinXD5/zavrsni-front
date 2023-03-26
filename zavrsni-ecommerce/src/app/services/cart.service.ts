import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  
  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {}

  addToCart(cartItem: CartItem) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems) {
        if (tempCartItem.id === cartItem.id) {
          existingCartItem = tempCartItem;
          break;
        }
      }
    }

    alreadyExistsInCart = existingCartItem != undefined;

    if (alreadyExistsInCart) {
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }

  remove(tempCartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tCI => tCI.id == tempCartItem.id);

    if(itemIndex > -1){
       this.cartItems.splice(itemIndex, 1);
    }

    this.computeCartTotals();
  }

  decrementQuantity(tempCartItem: CartItem) {
    tempCartItem.quantity--;
    
    if(tempCartItem.quantity === 0){
      this.remove(tempCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents:');
    for (let tc of this.cartItems) {
      const subtotal = tc.quantity * tc.unitPrice;
      console.log(
        `name: ${tc.name}, quantity: ${tc.quantity}, price: ${tc.unitPrice}, subtotal: ${subtotal}`
      );

      console.log(
        `totalPrice: ${totalPriceValue.toFixed(
          2
        )}, totalQuantity: ${totalQuantityValue}`
      );
      console.log('--------------');
    }
  }
}
