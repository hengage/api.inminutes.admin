import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
import { CreateProductDto, UpdateProductDto } from './product.dto';
@Injectable()
export class ProductService {
  constructor(private readonly apiService: ApiService) {}

  async createProduct(createProductDto: CreateProductDto): Promise<any> {
    try {

      return await this.apiService.post('/product/register', createProductDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    productId: string,
  ): Promise<any> {
    try {
      return await this.apiService.put(
        `/product/update/${productId}`,
        updateProductDto,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProducts(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    category: string = '',
    maxPrice: number,
    minPrice: number,
    startDate: Date,
    endDate: Date,
    status: string = '',
  ): Promise<any> {
    try {
      const params = { page, limit, search, category, maxPrice, minPrice, startDate, endDate, status };
      return await this.apiService.get('/admin/products', params);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductDetails(productId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/products/${productId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async approveOrDisapprove(productId: string, approve: boolean): Promise<any> {
    try {
      return await this.apiService.put(`/admin/products/${productId}/approval`, {
        approve,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
    
  }

  async createProductCategory(name: string
  ): Promise<any> {
    try {
      return await this.apiService.post(
        '/admin/products/category',
        {name}
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getProductCategories(): Promise<any> {
    try {
      return await this.apiService.get('/products/categories');
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createProductSubCategory(name: string
  ): Promise<any> {
    try {
      return await this.apiService.post(
        '/admin/products/sub-category',
        {name}
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductSubCategories(
    category: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<any> {
    try {
      const params = { page, limit };
      return await this.apiService.get(
        `/products/category/${category}/products`,
        params,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  
  async delete(productId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/products/${productId}/delete`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  
}
