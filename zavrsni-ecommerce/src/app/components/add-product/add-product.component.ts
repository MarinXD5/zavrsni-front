import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductCategory } from 'src/app/common/product-category';
import { ProductService } from 'src/app/services/product.service';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

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
    imageUrl: '',
    active: 1,
    unitsInStock: 0,
    dateCreated: null,
    lastUpdated: null,
    category: { id: null, categoryName: '' },
  };

  sanitizedImageUrl: SafeResourceUrl = '';

  constructor(private productService: ProductService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.checkIfProductIsAvailable();
  }

  addProduct(event: any) {
    console.log(this.product);
    //this.product.imageUrl = this.handleFileInput(this.product.imageUrl);
    if (this.product.category.categoryName == "LAPTOPS"){
      this.product.category.id = 1;
    }
    if (this.product.category.categoryName == "DESKTOPS"){
      this.product.category.id = 2;
    }
    if (this.product.category.categoryName == "MOBILE PHONES"){
      this.product.category.id = 3;
    }
    if (this.product.category.categoryName == "TABLETS"){
      this.product.category.id = 4;
    }
    if (this.product.category.categoryName == "SMART WATCHES"){
      this.product.category.id = 5;
    }
    if (this.product.category.categoryName == "COMPONENTS"){
      this.product.category.id = 6;
    }

    const tempImageUrl = 'assets/images/products/'
    const shortUrl = this.product.imageUrl.substring(12);

    this.product.imageUrl = tempImageUrl + shortUrl;

    this.productService.addProduct(this.product).subscribe();
  }

  checkIfProductIsAvailable() {
    if (this.product.unitsInStock === 0) {
      this.product.active = 0;
    }
  }
  
}
