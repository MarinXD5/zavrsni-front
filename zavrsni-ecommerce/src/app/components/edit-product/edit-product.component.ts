import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id: number = 0;
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

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.productService.getProductById(this.id).subscribe(data => {
      this.product = data;
    });
  }

  updateProduct(event: any){
    const tempImageUrl = 'assets/images/products/'
    const shortUrl = this.product.imageUrl.substring(12);

    this.product.imageUrl = tempImageUrl + shortUrl;
    this.productService.updateProduct(this.route.snapshot.params['id'], this.product).subscribe(data => {
      this.product = data;
    });
  }
}
