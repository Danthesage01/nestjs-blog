import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class CreateUserDto {
  @ApiProperty({
    description: 'This is the first name',
    example: 'John'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiPropertyOptional({
    description: 'This is the last name',
    example: 'Doe'
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;


  @ApiProperty({
    description: 'This is the email',
    example: 'Doe@example.com'
  })
  @IsEmail()
  @MaxLength(96)
  @IsNotEmpty()
  email: string;


  @ApiProperty({
    description: 'This is password and must be minimum of 8 characters, at least one letter, one number and one special character',
    example: 'password123#'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Minimum eight characters, at least one letter, one number and one special character',
  })
  password: string
}