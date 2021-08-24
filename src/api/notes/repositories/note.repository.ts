import { EntityRepository, Repository } from 'typeorm';
import { Notes } from '../entities/note.entity';

@EntityRepository(Notes)
export class NoteRepository extends Repository<Notes> {}
