import { Client } from 'src/clients/entity/client.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Invoices } from './invoices.entity';

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  item: string;
  @Column()
  hsn: number;
  @Column()
  qty: number;
  @Column()
  material: number;
  @Column()
  price: number;
  @Column()
  invoiceId: number;
  @Column()
  clientId: number;
  @ManyToOne(() => Invoices, (invoice) => invoice.items)
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoices;
  @ManyToOne(() => Client, (client) => client.items)
  @JoinColumn({ name: 'clientId' })
  client: Client;
}
