import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { Routes, Services } from '../../utils/constants';
import { CreatClientDto } from '../dtos/CreateClient.dto';
import { UpdateClientDto } from '../dtos/UpdateClient.dto';
import { IClientService } from '../interfaces/clients.interface';
@Controller(Routes.CLIENT)
export class ClientController {
  constructor(@Inject(Services.CLIENT) private clientService: IClientService) {}

  //get all CLients
  @Get()
  async getAllClients() {
    return this.clientService.getAllClients();
  }

  //get single client
  @Get(':id')
  async getClientById(@Param() param) {
    const { id } = param;
    return this.clientService.getClientById(id);
  }
  //add client
  @Post()
  async addClient(@Body(ValidationPipe) createClientDto: CreatClientDto) {
    // console.log(createClientDto);
    return this.clientService.addClient(createClientDto);
  }
  //update Client
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Patch(':id')
  updateClientById(@Param() param, @Body() updates: UpdateClientDto) {
    const { id } = param;
    return this.clientService.updateClient(id, updates);
  }
  //delete Client
  @Delete(':id')
  async deleteClientById(@Param() param) {
    const { id } = param;
    return this.clientService.deleteClient(id);
  }
}
