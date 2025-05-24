import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
import {
  CreateProductDto,
  GetProductPaginationDto,
  GetProductsQueryDto,
  UpdateProductDto,
} from './product.dto';
@Injectable()
export class ProductService {
  constructor(private readonly apiService: ApiService) {}

  async createProduct(
    createProductDto: CreateProductDto,
    admin: string,
  ): Promise<any> {
    try {
      return await this.apiService.post(
        `/admin/products/register/${admin}`,
        createProductDto,
      );
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

  async getProducts(query: GetProductsQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/products', query);
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
      if (approve) {
        return await this.apiService.patch(
          `/admin/products/${productId}/approve`,
          {},
        );
      } else {
        return await this.apiService.patch(
          `/admin/products/${productId}/reject`,
          {},
        );
      }
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createProductCategory(name: string): Promise<any> {
    try {
      return await this.apiService.post('/admin/products/category', { name });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async getProductCategories(query: GetProductPaginationDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/products/categories', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createSubCategory(data: {
    subCategoryName: string;
    categoryId: string;
  }): Promise<any> {
    try {
      return await this.apiService.post(`/admin/products/sub-category/`, {
        name: data.subCategoryName,
        category: data.categoryId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createProductSubCategory(name: string): Promise<any> {
    try {
      return await this.apiService.post('/admin/products/sub-category', {
        name,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductSubCategories(
    category: string,
    query: GetProductPaginationDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/products/category/${category}/products`,
        query,
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(productId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/products/${productId}`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTopProducts(query: GetProductsQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/products/top', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getTopProductCategories(query: GetProductPaginationDto): Promise<any> {
    try {
      return await this.apiService.get('/products/category/top', query);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductSummary(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/products/summary`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getProductMetrics(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/products/metrics`);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
