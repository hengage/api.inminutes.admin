import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
  BadRequestException,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  CreateProductSubCategoryDto,
  GetProductPaginationDto,
  GetProductsQueryDto,
  UpdateProductDto,
} from './product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Validate } from 'class-validator';
import { query, Request } from 'express';
import { AdminDocument } from 'src/admin/schema/admin.schema';

export interface AuthenticatedRequest extends Request {
  user?: AdminDocument;
}
@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('register')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() request: AuthenticatedRequest,
  ) {
    return this.productService.createProduct(
      createProductDto,
      request.user?._id,
    );
  }

  @Put('update/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(updateProductDto, productId);
  }

  @Get('list')
  async getProducts(@Query() query: GetProductsQueryDto) {
    return this.productService.getProducts(query);
  }

  @Put(':productId/approval')
  async approveOrDisapprove(
    @Param('productId') productId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.productService.approveOrDisapprove(productId, approve);
  }

  @Post('category')
  async createProductCategory(@Body('name') name: string) {
    return this.productService.createProductCategory(name);
  }

  @Post('sub-category/')
  async createSubCategory(
    @Body()
    data: CreateProductSubCategoryDto,
  ) {
    return this.productService.createSubCategory(data);
  }

  @Get('categories')
  async getProductCategories(@Query() query: GetProductPaginationDto) {
    return this.productService.getProductCategories(query);
  }

  @Get('categories/:category/sub-categories')
  async getProductSubCategories(
    @Param('category') category: string,
    @Query() query: GetProductPaginationDto,
  ) {
    return this.productService.getProductSubCategories(category, query);
  }

  @Delete(':productId')
  async delete(@Param('productId') productId: string) {
    return this.productService.delete(productId);
  }

  @Get('top-products')
  async getTopProducts(@Query() query: GetProductsQueryDto) {
    return this.productService.getTopProducts(query);
  }

  @Get('top-product-categories')
  async getTopProductCategories(@Query() query: GetProductPaginationDto) {
    return this.productService.getTopProductCategories(query);
  }

  @Get('product-summary')
  async getProductSummary() {
    return this.productService.getProductSummary();
  }

  @Get('product-metrics')
  async getProductMetrics() {
    return this.productService.getProductMetrics();
  }
  @Get(':productId')
  async getProductDetails(@Param('productId') productId: string) {
    return this.productService.getProductDetails(productId);
  }
}
