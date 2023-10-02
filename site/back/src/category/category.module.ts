import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ProductService } from '../product/product.service';
import { CategoryController } from './category.controller';


@Module({
  controllers: [CategoryController],
  providers: [CategoryService, ProductService],
})
export class CategoryModule {}
