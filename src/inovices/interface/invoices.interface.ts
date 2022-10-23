import {
  createInvoiceType,
  findAllReturnType,
  findInvoiceByIdReturnType,
} from '../types/invoice.types';

export interface IInvoicesService {
  create(createInoviceTypes: createInvoiceType, clientId: number): Promise<any>;
  getIntialData(): Promise<any>;
  getRevenueByYear(year: number): Promise<any>; // changes remain
  findAll(): Promise<findAllReturnType[]>;
  findOne(id: number): Promise<findInvoiceByIdReturnType[]>;
}
