import { Module } from '@nestjs/common';
import { NotesModule } from './notes/notes.module';
import { DatabaseModule } from '../common/database/database.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseModule, NotesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}
