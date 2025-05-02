import { IsEmail, IsString } from 'class-validator';
import { ActiveUser } from '../decorators/active-user.decorator';
import { number } from 'joi';
export interface ActiveUserData {

 sub: number;


 email: string

}