import { Client } from '../entity/client.entity';
import { createClientType, updateClientType } from '../types/clients.types';

export interface IClientService {
  getAllClients(): Promise<Client[]>;
  getClientById(id: number): Promise<Client>;
  //need body type here
  addClient(clientDetails: createClientType): Promise<Client>;
  updateClient(id: string, updates: updateClientType): Promise<any>;
  deleteClient(id: string): Promise<string>;
}
