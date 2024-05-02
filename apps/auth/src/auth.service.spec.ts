import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ClientProxy } from '@nestjs/microservices';
import { MESSAGE_SERVICE } from './constant/service';
import { never } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let userModel: Model<User>;
  let jwtService: JwtService;
  let messageService: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
        {
          provide: MESSAGE_SERVICE,
          useValue: ClientProxy,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
    jwtService = module.get<JwtService>(JwtService);
    messageService = module.get<ClientProxy>(MESSAGE_SERVICE);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should throw BadRequestException when passwords do not match', async () => {
      const registerDto: RegisterDto = {
        email: 'test@example.com',
        password: 'password1',
        confirmPassword: 'password2',
        name: 'Test User',
      };
      await expect(service.signUp(registerDto)).rejects.toThrow(
        BadRequestException,
      );
    });

    // Add more test cases for signUp method
  });

  describe('login', () => {
    it('should throw UnauthorizedException when user is not found', async () => {
      const loginDto: LoginDto = {
        email: 'nonexistent@example.com',
        password: 'password',
      };
      jest.spyOn(userModel, 'findOne').mockResolvedValue(null);
      await expect(service.login(loginDto)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    // Add more test cases for login method
  });
});
