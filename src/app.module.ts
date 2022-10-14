import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientModule } from './clients/client.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './clients/entity/client.entity';
import { InovicesModule } from './inovices/inovices.module';
import { Invoices } from './inovices/entities/invoices.entity';
import { Items } from './inovices/entities/items.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.dev' }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: parseInt(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB_NAME,
      synchronize: true,
      entities: [Client, Invoices, Items],
      logging: false,
    }),
    ClientModule,
    InovicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
