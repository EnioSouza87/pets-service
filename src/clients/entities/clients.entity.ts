import { PrimaryGeneratedColumn, Entity, Column } from 'typeorm';

@Entity()
export class Clients {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phoneNumber: string;
}
