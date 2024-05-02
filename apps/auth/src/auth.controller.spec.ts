import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { MessageDto } from './dto/message.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signUp: jest.fn(),
            login: jest.fn(),
            sendMessage: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signUp', () => {
    it('should call authService.signUp with correct parameters', async () => {
      const registerDto: RegisterDto = {
        email: 'wahyu123@gmail.com',
        password: 'Waras123!!',
        confirmPassword: 'Waras123!!',
        name: 'Wahyu',
      };
      await controller.signUp(registerDto);
      expect(authService.signUp).toHaveBeenCalledWith(registerDto);
    });
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const loginDto: LoginDto = {
        email: 'wahyu123@gmail.com',
        password: 'Waras123!!',
      };
      await controller.login(loginDto);
      expect(authService.login).toHaveBeenCalledWith(loginDto);
    });
  });

  describe('sendMessage', () => {
    it('should call authService.sendMessage with correct parameters', async () => {
      const messageDto: MessageDto = {
        content: 'Hellow World!',
      };
      await controller.sendMessage(messageDto);
      expect(authService.sendMessage).toHaveBeenCalledWith(messageDto);
    });
  });
});
