import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Client } from '../entity/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  clientParamsType,
  createClientType,
  updateClientType,
} from '../types/clients.types';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}
  async getAllClients() {
    return await this.clientRepository.find();
  }

  async getClientById(id: clientParamsType) {
    const exsist = await this.clientRepository.findOneBy({ id: Number(id) });
    if (!exsist) throw new NotFoundException();
    return exsist;
  }

  async addClient(clientDetails: createClientType) {
    const exsist = await this.clientRepository.findOne({
      where: {
        email: clientDetails.email,
      },
    });
    if (exsist)
      throw new HttpException('Client Already Exsist', HttpStatus.CONFLICT);
    const newClient = this.clientRepository.create(clientDetails);
    return this.clientRepository.save(newClient);
  }

  async updateClient(id: clientParamsType, updates: updateClientType) {
    if (!updates)
      throw new HttpException(
        'This Property can not be updated',
        HttpStatus.NOT_MODIFIED,
      );
    let client = await this.getClientById(id);
    client = { ...client, ...updates };
    return this.clientRepository.save(client);
  }

  async deleteClient(id: clientParamsType) {
    const client = await this.getClientById(id);
    await this.clientRepository.remove(client);
    return 'Deleted Successfully';
  }
}
