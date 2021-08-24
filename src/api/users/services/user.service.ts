import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { UserRegisterReqDto } from '../../auth/dtos/req/user-resgister-req.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private repository: UserRepository) {}

  async createUser(dto: UserRegisterReqDto) {
    let newUser = await this.repository.create(dto);
    return this.repository.save(newUser);
  }

  async findUserByEmail(email: string): Promise<User> {
    let user = await this.repository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }

  async findUserById(userId: number): Promise<User> {
    let user = await this.repository.findOne({ where: { user_id: userId } });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
}
