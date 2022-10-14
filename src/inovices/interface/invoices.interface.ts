import {
  createInvoiceType,
  findAllReturnType,
  findInvoiceByIdReturnType,
} from '../types/invoice.types';

export interface IInvoicesService {
  create(createInoviceTypes: createInvoiceType, clientId: number): Promise<any>;
  findAll(): Promise<findAllReturnType[]>;
  findOne(id: number): Promise<findInvoiceByIdReturnType[]>;
}
