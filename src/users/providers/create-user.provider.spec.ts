// import { CreateUserDto } from './../dtos/create-user.dto';
// import { Test, TestingModule } from '@nestjs/testing';
// import { UsersService } from './users.service';
// import { CreateUserProvider } from './create-user.provider';
// import { MailService } from 'src/mail/providers/mail.service';
// import { HashingProvider } from 'src/auth/providers/hashing.provider';
// import { DataSource, ObjectLiteral, Repository } from 'typeorm';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { User } from '../user.entity';
// import { BadRequestException } from '@nestjs/common';

// type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>
// const createMockRepository = <T extends ObjectLiteral = any>(): MockRepository<T> => ({
//  findOne: jest.fn(),
//  create: jest.fn(),
//  save: jest.fn(),
// })

// describe('CreateUserProvider', () => {
//  let provider: CreateUserProvider
//  let usersRepository: MockRepository
//  const user = {
//   firstName: "John",
//   lastName: "Doe",
//   email: "Doejohn@gmail.com",
//   password: "password",
//  }

//  beforeEach(async () => {
//   const module: TestingModule = await Test.createTestingModule({
//    providers: [
//     CreateUserProvider,
//     { provide: getRepositoryToken(User), useValue: createMockRepository },
//     { provide: DataSource, useValue: {} },
//     { provide: MailService, useValue: { sendUserWelcome: jest.fn(() => Promise.resolve()) } },
//     {
//      provide: HashingProvider, useValue: {
//       hashPassword: jest.fn(() => user.password)
//      }
//     },
//    ]
//   }).compile();

//   provider = module.get<CreateUserProvider>(CreateUserProvider)
//   usersRepository = module.get(getRepositoryToken(User))
//  });

//  it('CreateUserProvider should be defined', () => {
//   expect(provider).toBeDefined()
//  });

//  describe('createUser', () => {
//   describe('When the user does not exist in database', () => {
//    it('should create a new user', async () => {
//     usersRepository.findOne?.mockReturnValue(null)
//     usersRepository.create?.mockReturnValue(user)
//     usersRepository.save?.mockReturnValue(user)
//     const newUser = await provider.createUser(user)
//     expect(usersRepository.findOne).toHaveBeenCalledWith({
//      where: {
//       email: user.email
//      }
//     })
//     expect(usersRepository.create).toHaveBeenCalledWith(user)
//     expect(usersRepository.save).toHaveBeenCalledWith(user)
//    })
//   })
//   describe('When the user exists in the database', () => {
//    it('throw BadRequestException', async () => {
//     usersRepository.findOne?.mockReturnValue(user.email)
//     usersRepository.create?.mockReturnValue(user)
//     usersRepository.save?.mockReturnValue(user)
//     try {
//      const newUser = await provider.createUser(user)
//     } catch (error) {
//      expect(error).toBeInstanceOf(BadRequestException)
//     }
//    })
//   })
//  })
// });


import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';

type MockRepository<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
const createMockRepository = (): MockRepository => ({
 findOne: jest.fn(),
 create: jest.fn(),
 save: jest.fn(),
});

describe('CreateUserProvider', () => {
 let provider: CreateUserProvider;
 let usersRepository: MockRepository;
 const mockUser: CreateUserDto = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'doe@gmail.com',
  password: 'password123',
 };

 beforeEach(async () => {
  usersRepository = createMockRepository();

  const module: TestingModule = await Test.createTestingModule({
   providers: [
    CreateUserProvider,
    {
     provide: getRepositoryToken(User),
     useValue: usersRepository,
    },
    {
     provide: MailService,
     useValue: {
      sendUserWelcome: jest.fn().mockResolvedValue(undefined),
     },
    },
    {
     provide: HashingProvider,
     useValue: {
      hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
     },
    },
   ],
  }).compile();

  provider = module.get<CreateUserProvider>(CreateUserProvider);
 });

 it('should be defined', () => {
  expect(provider).toBeDefined();
 });

 describe('createUser', () => {
  it('should create a new user when user does not exist', async () => {
   usersRepository.findOne!.mockResolvedValue(null);
   usersRepository.create!.mockReturnValue({ ...mockUser, password: 'hashedPassword' });
   usersRepository.save!.mockResolvedValue({ ...mockUser, id: 1 });

   const result = await provider.createUser(mockUser);

   expect(usersRepository.findOne).toHaveBeenCalledWith({
    where: { email: mockUser.email },
   });
   expect(usersRepository.create).toHaveBeenCalledWith({
    ...mockUser,
    password: 'hashedPassword',
   });
   expect(usersRepository.save).toHaveBeenCalled();
   expect(result).toEqual(expect.objectContaining({ email: mockUser.email }));
  });

  it('should throw BadRequestException when user already exists', async () => {
   usersRepository.findOne!.mockResolvedValue(mockUser);

   await expect(provider.createUser(mockUser)).rejects.toBeInstanceOf(BadRequestException);
   expect(usersRepository.findOne).toHaveBeenCalled();
  });
 });
});
