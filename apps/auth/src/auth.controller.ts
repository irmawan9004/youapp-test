import { Post, Body, Controller, Get } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { MessageDto } from './dto/message.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/register')
  signUp(@Body() registerDto: RegisterDto): Promise<{ token: string }> {
    return this.authService.signUp(registerDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }

  @Post('/send')
  sendMessage(@Body() messageDto: MessageDto): Promise<{ content: string }> {
    return this.authService.sendMessage(messageDto);
  }

  @Get('/view')
  viewMessage(): Promise<{ content: string }> {
    return this.authService.viewMessage();
  }
}
