import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from './role/role.module';
import { ClientModule } from './client/client.module';
import { ContactModule } from './contact/contact.module';
import { OrderModule } from './order/order.module';
import { StatusModule } from './status/status.module';
import { PromotionModule } from './promotion/promotion.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { ProductPromotionModule } from './product-promotion/product-promotion.module';
import { OrderProductModule } from './order-product/order-product.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ProductColorModule } from './product-color/product-color.module';




@Module({
 controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        // console.log('DB_HOST:', configService.get<string>('DB_HOST'));
        // console.log('DB_PORT:', configService.get<string>('DB_PORT'));
        // console.log('DB_USERNAME:', configService.get<string>('DB_USERNAME'));
        // console.log('DB_PASSWORD:', configService.get<string>('DB_PASSWORD'));
        // console.log('DB_NAME:', configService.get<string>('DB_NAME'));

        return {
          type: 'postgres' as 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT')),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),

    RoleModule, ClientModule, ContactModule, OrderModule, StatusModule, PromotionModule, ProductModule, ImageModule, ColorModule, CategoryModule, OrderStatusModule, ProductPromotionModule, OrderProductModule, ProductCategoryModule, ProductColorModule],
})
export class AppModule { }
