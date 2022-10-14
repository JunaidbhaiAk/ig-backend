import { Module } from '@nestjs/common';
// import { Services } from '../utils/constants';
import { ClientController } from './controllers/client.controller';
import { Client } from './entity/client.entity';
import { ClientService } from './services/client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from 'src/utils/constants';
@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientController],
  providers: [{ provide: Services.CLIENT, useClass: ClientService }],
})
export class ClientModule {}
