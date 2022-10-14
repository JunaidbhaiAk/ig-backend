import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInoviceDto } from '../dto/create-inovice.dto';
import { Invoices } from '../entities/invoices.entity';
import { Items } from '../entities/items.entity';
import { ItemsType } from '../types/invoice.types';

@Injectable()
export class InovicesService {
  constructor(
    @InjectRepository(Invoices)
    private readonly invoicesRepo: Repository<Invoices>,
    @InjectRepository(Items)
    private readonly itemsRepo: Repository<Items>,
  ) {}
  async create(createInoviceDto: CreateInoviceDto, clientId: number) {
    const { challanNo, transportaion, items } = createInoviceDto;
    const invoice = this.invoicesRepo.create({
      challanNo,
      transportaion,
      clientId,
    });
    const invoiceRes = await this.invoicesRepo.save(invoice);
    if (invoiceRes) {
      return this.insertItems(Number(invoiceRes.id), items);
    } else throw new InternalServerErrorException();
  }

  async insertItems(invoiceId: number, items: ItemsType[]) {
    return await this.itemsRepo.insert(
      items.map((ele) => ({ ...ele, invoiceId })),
    );
  }

  async findAll() {
    return await this.invoicesRepo
      .createQueryBuilder('invoices')
      .innerJoinAndSelect('invoices.client', 'client')
      .innerJoinAndSelect('invoices.items', 'items')
      .select(['invoices.id', 'invoices.created_at', 'client.name'])
      .groupBy('items.invoiceId')
      .getMany();
  }

  async findOne(id: number) {
    return await this.invoicesRepo.findOne({
      where: { id: id },
      relations: ['items'],
    });
  }
}
