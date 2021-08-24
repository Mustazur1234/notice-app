import { Module } from '@nestjs/common';
import { NotesController } from './controllers/notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteRepository } from './repositories/note.repository';
import { NoteService } from './services/note.service';

@Module({
  imports: [TypeOrmModule.forFeature([NoteRepository])],
  providers: [NoteService],
  controllers: [NotesController],
})
export class NotesModule {}
