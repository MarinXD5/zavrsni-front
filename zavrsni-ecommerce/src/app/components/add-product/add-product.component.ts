import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

  product: any = {
    name: '',
    description: '',
    unitPrice: 0,
    imageUrl: null,
    active: 1,
    unitsInStock: 0,
    dateCreated: null,
    lastUpdated: null,
    category: { id: null, categoryName: '' }
  };

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  addProduct() {
    console.log(this.product);
    this.productService.addProduct(this.product).subscribe();
  }
}
