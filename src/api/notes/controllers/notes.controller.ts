import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

import { CreateNoteReqDto } from '../dtos/req/create-note-req.dto';
import { UpdateNoteReqDto } from '../dtos/req/update-note.req.dto';
import { NoteService } from '../services/note.service';

@ApiTags('Note')
@Controller('notes')
export class NotesController {
  constructor(private noteService: NoteService) {
         
  }
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateNoteReqDto,@Req() req:any) {
    return this.noteService.createNote(dto,req.user);
  }

  @Patch(':note_id')
  @UseGuards(JwtAuthGuard)
  update(@Param('note_id') noteId: number, @Body() dto: UpdateNoteReqDto) {
    return this.noteService.updateNote(noteId, dto);
  }
  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Req() req:any) {
    return this.noteService.getAllNotes(req.user);
  }
  @Get(':note_id')
  @UseGuards(JwtAuthGuard)
  getOne(@Param('note_id') noteId: number,@Req() req:any) {
    return this.noteService.getOneNote(noteId,req.user);
  }
  @Delete(':note_id')
  @UseGuards(JwtAuthGuard)
  delete(@Param('note_id') noteId: number,@Req() req:any) {
    return this.noteService.deleteNote(noteId,req.user);
  }
}
