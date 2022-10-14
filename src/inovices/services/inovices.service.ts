import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from 'src/clients/entity/client.entity';
import { Repository } from 'typeorm';
import { CreateInoviceDto } from '../dto/create-inovice.dto';
import { Invoices } from '../entities/invoices.entity';
import { Items } from '../entities/items.entity';
import { ItemsType } from '../types/invoice.types';
import { getSum } from '../../utils/helper';
@Injectable()
export class InovicesService {
  constructor(
    @InjectRepository(Invoices)
    private readonly invoicesRepo: Repository<Invoices>,
    @InjectRepository(Items)
    private readonly itemsRepo: Repository<Items>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
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

  async getIntialData() {
    // return this.invoicesRepo
    //   .createQueryBuilder('invoices')
    //   .innerJoin('invoices.items', 'items')
    //   .where('year(now()) = year(created_at)')
    //   .groupBy('MONTHNAME(created_at)')
    //   .select('MONTHNAME(created_at)', 'month')
    //   .addSelect('SUM(items.price)', 'sum')
    //   .getRawMany();
    let revenue: any = await this.itemsRepo
      .createQueryBuilder('items')
      .select('sum(price)', 'total')
      .groupBy('invoiceId')
      .getRawMany();
    revenue = getSum(revenue);
    const totalClients = await this.clientRepo.count();
    return { revenue, totalClients };
  }
  async findAll() {
    const dateqry =
      'CONCAT(SUBSTR(MONTHNAME(invoices.created_at),1,3)," ",DAY(invoices.created_at)," ",YEAR(invoices.created_at))';
    return await this.invoicesRepo
      .createQueryBuilder('invoices')
      .innerJoinAndSelect('invoices.client', 'client')
      .innerJoin('invoices.items', 'items')
      .select(['invoices.id', 'client.name'])
      .addSelect(dateqry, 'created_at')
      .groupBy('items.invoiceId')
      .orderBy('invoices.created_at', 'ASC')
      .getRawMany();
  }

  async findOne(id: number) {
    return await this.invoicesRepo.findOne({
      where: { id: id },
      relations: ['items'],
    });
  }
}
