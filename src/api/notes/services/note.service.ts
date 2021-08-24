import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteReqDto } from '../dtos/req/create-note-req.dto';
import { UpdateNoteReqDto } from '../dtos/req/update-note.req.dto';
import { NoteRepository } from '../repositories/note.repository';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class NoteService {
  constructor(private repository: NoteRepository) {}

  async createNote(dto: CreateNoteReqDto,user:User) {
    let note = await this.repository.create({...dto,user:user});
    return this.repository.save(note);
  }

  async updateNote(noteId: number, dto: UpdateNoteReqDto) {
    let oldNote = await this.repository.findOne({ where: { note_id: noteId } });
    return this.repository.save({ ...oldNote, ...dto });
  }
  async getOneNote(noteId: number,user:User) {
    let note = await this.repository.findOne({ where: { note_id: noteId,user:{user_id:user.user_id} } });

    if (!note) {
      throw new NotFoundException(`note with id ${noteId} not Found`);
    }
    return note;
  }
  async getAllNotes(user:User) {
    return this.repository.find({where:{user:{user_id:user.user_id}}});
  }
  async deleteNote(noteId: number,user:User) {
    let res = await this.repository.delete({ note_id: noteId ,user:{user_id:user.user_id}});
    if (res.affected > 0) {
      return { is_deleted: true };
    }
    return { is_deleted: false };
  }
}
