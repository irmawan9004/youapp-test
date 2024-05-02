import {
  BadRequestException,
  Injectable,
  Inject,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { MessageDto } from './dto/message.dto';
import { MESSAGE_SERVICE } from './constant/service';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq/rmq.service';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private rmqService: RmqService,
    private jwtService: JwtService,
    @Inject(MESSAGE_SERVICE) private messageService: ClientProxy,
  ) {
    this.messageService = ClientProxyFactory.create(
      rmqService.getOptions('message-queue'),
    );
  }

  async signUp(
    signUpDto: RegisterDto,
  ): Promise<{ token: string; message: string }> {
    const { email, password, name, confirmPassword } = signUpDto;
    if (password !== confirmPassword) {
      throw new BadRequestException(
        'Password and confirm password do not match',
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    const token = this.jwtService.sign({ id: user._id });

    return { token, message: 'Register Berhasil' };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; message: string }> {
    const { email, password } = loginDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }
    const token = this.jwtService.sign({ id: user._id });

    return { token, message: 'Login successful' };
  }

  async sendMessage(
    messageDto: MessageDto,
  ): Promise<{ content: string; message: string }> {
    const { content } = messageDto;
    try {
      await this.messageService.emit('message-event', content).toPromise();
    } catch (error) {
      throw new Error('Failed to send message');
    }
    return { content, message: 'Message sent' };
  }

  async viewMessage(): Promise<{ content: string }> {
    const message = await this.messageService
      .send('message-event', {})
      .toPromise();
    return message;
  }
}
