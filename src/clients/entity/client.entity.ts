import { Invoices } from 'src/inovices/entities/invoices.entity';
import { Items } from 'src/inovices/entities/items.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  address: string;
  @Column()
  mob: string;
  @Column()
  email: string;
  @Column()
  discount: number;
  @Column()
  GSTNo: string;
  @OneToMany(() => Invoices, (invoice) => invoice.client)
  invoices: Array<Invoices>;
  @OneToMany(() => Items, (item) => item.client)
  items: Array<Items>;
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
