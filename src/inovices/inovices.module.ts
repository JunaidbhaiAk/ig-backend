import { Module } from '@nestjs/common';
import { InovicesService } from './services/inovices.service';
import { InovicesController } from './controllers/inovices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoices } from './entities/invoices.entity';
import { Items } from './entities/items.entity';
import { Services } from 'src/utils/constants';
import { Client } from 'src/clients/entity/client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Invoices, Items, Client])],
  controllers: [InovicesController],
  providers: [{ provide: Services.INVOICES, useClass: InovicesService }],
})
export class InovicesModule {}
