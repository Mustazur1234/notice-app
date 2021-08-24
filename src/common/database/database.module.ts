import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      database: 'notes_db',
      entities: ['dist/**/*.entity{.ts,.js}'],
      //logging: 'all',
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
