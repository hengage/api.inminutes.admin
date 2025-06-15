import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiService } from 'src/lib/apiCalls';
import { extractErrorMessage, throwHttpException } from 'src/lib';
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
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async getProducts(query: GetProductsQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/products', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getProductDetails(productId: string): Promise<any> {
    try {
      return await this.apiService.get(`/admin/products/${productId}`);
    } catch (error) {
      throwHttpException(error);
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
      throwHttpException(error);
    }
  }

  async createProductCategory(name: string): Promise<any> {
    try {
      return await this.apiService.post('/admin/products/category', { name });
    } catch (error) {
      throwHttpException(error);
    }
  }
  async getProductCategories(query: GetProductPaginationDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/products/categories', query);
    } catch (error) {
      throwHttpException(error);
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
      if (error.code === 'ECONNREFUSED') {
        console.error('Core API connection failed:', error.message);
        throw new InternalServerErrorException();
      }
      throwHttpException(error);
    }
  }

  async getCategorySubCategories(
    categoryId: string,
    query: GetProductPaginationDto,
  ): Promise<any> {
    try {
      return await this.apiService.get(
        `/admin/products/category/${categoryId}/sub-categories`,
        query,
      );
    } catch (error) {
      throwHttpException(error);
    }
  }

  async delete(productId: string): Promise<any> {
    try {
      return await this.apiService.delete(`/admin/products/${productId}`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopProducts(query: GetProductsQueryDto): Promise<any> {
    try {
      return await this.apiService.get('/admin/products/top', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getTopProductCategories(query: GetProductPaginationDto): Promise<any> {
    try {
      return await this.apiService.get('/products/category/top', query);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getProductSummary(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/products/summary`);
    } catch (error) {
      throwHttpException(error);
    }
  }

  async getProductMetrics(): Promise<any> {
    try {
      return await this.apiService.get(`/admin/products/metrics`);
    } catch (error) {
      throwHttpException(error);
    }
  }
}
