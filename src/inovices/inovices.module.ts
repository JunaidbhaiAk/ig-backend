import { Module } from '@nestjs/common';
import { InovicesService } from './services/inovices.service';
import { InovicesController } from './controllers/inovices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoices } from './entities/invoices.entity';
import { Items } from './entities/items.entity';
import { Services } from 'src/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Invoices, Items])],
  controllers: [InovicesController],
  providers: [{ provide: Services.INVOICES, useClass: InovicesService }],
})
export class InovicesModule {}
