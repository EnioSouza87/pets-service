import { Clients } from 'src/clients/entities/clients.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  TableForeignKey,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class Pets {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  name: string;

  @Column()
  breed: string;

  @Column()
  petType: string;

}
