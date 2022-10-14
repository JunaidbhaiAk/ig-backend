import { Controller, Get, Post, Body, Param, Inject } from '@nestjs/common';
import { CreateInoviceDto } from '../dto/create-inovice.dto';
import { Routes, Services } from 'src/utils/constants';
import { IInvoicesService } from '../interface/invoices.interface';

@Controller(Routes.INVOICE)
export class InovicesController {
  constructor(
    @Inject(Services.INVOICES)
    private readonly inovicesService: IInvoicesService,
  ) {}

  @Post(':id')
  async create(
    @Body() createInoviceDto: CreateInoviceDto,
    @Param('id') id: number,
  ) {
    return await this.inovicesService.create(createInoviceDto, id);
  }
  @Get('intial')
  async getIntialData() {
    return await this.inovicesService.getIntialData();
  }

  @Get()
  async findAllInvoices() {
    return await this.inovicesService.findAll();
  }

  @Get(':id')
  async findInvoiceById(@Param('id') id: string) {
    return await this.inovicesService.findOne(+id);
  }
}
