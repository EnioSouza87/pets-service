import { Clients } from './clients/entities/clients.entity';
import { Module } from '@nestjs/common';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pets } from './pets/entities/pets.entity';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [
    PetsModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      synchronize: true,
      database: 'db.sqlite',
      entities: [Pets, Clients],
    }),
    ClientsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
