import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { getPostgresConfig } from './config/postgres.config';
// import { PromoModule } from './promo/promo.module'
// import { CategoryModule } from './category/category.module'
import { LipstickModule } from './lipstick/lipstick.module';
// import { ArticleModule } from './article/article.module'
// import { PhotoCategoryModule } from './photocategory/photocategory.module'
// import { GalleryModule } from './gallery/gallery.module'
// import { RoomPageModule } from './room_page/product.module'
import { UserModule } from './users/users.module';
// import { CartModule } from './cart/cart.module'
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { RoleModule } from './roles/roles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getPostgresConfig,
    }),
    // PromoModule,
    // CategoryModule,
    LipstickModule,
    // ArticleModule,
    // PhotoCategoryModule,
    // GalleryModule,
    // RoomPageModule,
    UserModule,
    // CartModule,
    AuthModule,
    OrderModule,
    RoleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
