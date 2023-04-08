import { CartItem } from "./cart-item";

export class OrderItem {
    public imageUrl?: string;
    public quantity?: number;
    public unitPrice?: number;
    public productId?: number;

    constructor(public cartItem: CartItem){
        this.imageUrl = cartItem.imageUrl;
        this.quantity = cartItem.quantity;
        this.unitPrice = cartItem.unitPrice;
        this.productId = cartItem.id;
    }
}
