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
} from '@nestjs/common';
import { ProductService } from './product.service';
import {
  CreateProductDto,
  GetProductPaginationDto,
  GetProductsQueryDto,
  UpdateProductDto,
} from './product.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Validate } from 'class-validator';
import { query } from 'express';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('register')
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put('update/:productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(updateProductDto, productId);
  }

  @Get('list')
  async getProducts(
    @Query() query: GetProductsQueryDto
  ) {
    return this.productService.getProducts(
      query
    );
  }

  @Get(':productId')
  async getProductDetails(@Param('productId') productId: string) {
    return this.productService.getProductDetails(productId);
  }

  @Put(':productId/approval')
  async approveOrDisapprove(
    @Param('productId') productId: string,
    @Body('approve') approve: boolean,
  ) {
    return this.productService.approveOrDisapprove(productId, approve);
  }

  @Post('category')
  async createProductCategory(
    @Body() name: string,
  ) {
    return this.productService.createProductCategory(name);
  }

  @Get('categories')
  async getProductCategories(@Query() query: GetProductPaginationDto) {
    return this.productService.getProductCategories(query);
  }

  @Post('sub-category')
  async createProductSubCategory(
    @Body() name: string
  ) {
    return this.productService.createProductSubCategory(
      name
    );
  }

  @Get('categories/:category/sub-categories')
  async getProductSubCategories(
    @Param('category') category: string,
    @Query() query: GetProductPaginationDto
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
    return this.productService.getProductSummary()
  }

  @Get('product-metrics')
  async getProductMetrics() {
    return this.productService.getProductMetrics();
  }
}
