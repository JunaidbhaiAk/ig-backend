import { Client } from 'src/clients/entity/client.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Items } from './items.entity';

@Entity()
export class Invoices {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  challanNo: string;
  @Column()
  transportaion: number;
  @Column()
  clientId: number;
  @ManyToOne(() => Client, (client) => client.invoices)
  @JoinColumn({ name: 'clientId' })
  client: Client;
  @OneToMany(() => Items, (item) => item.invoice)
  items: Array<Items>;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
}
