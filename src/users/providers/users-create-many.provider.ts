import { ConflictException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';

@Injectable()
export class UsersCreateManyProvider {
   /**
  * The constructor to handle dependency injections
  */
   constructor(
      // Inject Datasource
      private readonly datasource: DataSource
   ) { }

   /**
      * Create many user - Transaction in nestjs
      */
   public async createMany(createManyUsersDto: CreateManyUsersDto) {
      let newUsers: User[] = [];
      // Create Query Runner Instance
      const queryRunner = this.datasource.createQueryRunner()
      try {
         // Connect to the datasource
         await queryRunner.connect();
         await queryRunner.startTransaction();
      } catch (error) {
         throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
            description: 'Error connecting to the database'
         })
      }
      // Start Transaction
      try {
         for (let user of createManyUsersDto.users) {
            let newUser = queryRunner.manager.create(User, user)
            let result = await queryRunner.manager.save(newUser)
            newUsers.push(result)
         }
         // If successful, commit
         await queryRunner.commitTransaction();
      } catch (error) {
         // If unsuccessful,rollback
         await queryRunner.rollbackTransaction()
         throw new ConflictException('Could not complete the transaction', {
            description: String(error)
         })
      } finally {

         try {
            // Release connection
            await queryRunner.release()

         } catch (error) {
            throw new RequestTimeoutException('Could not release the connection', {
               description: String(error)
            })
         }

      }
      return newUsers
   }
}
