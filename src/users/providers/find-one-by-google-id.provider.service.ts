import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FindOneByGoogleIdProviderService {
 constructor(
  /**
   * Inject usersRepository
   */
  @InjectRepository(User)
  private readonly usersRepository: Repository<User>
 ) { }


 public async findOneByGoogleId(googleId: string) {
  return await this.usersRepository.findOneBy({ googleId })
 }
}
