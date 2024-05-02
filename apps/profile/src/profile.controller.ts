import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Profile } from './schemas/profile.schema';
import { UpdateProfileDto } from './dto/dto.update';
import { CreateProfileDto } from './dto/dto.create';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('api/profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('/getProfile')
  async findAllProfile(): Promise<Profile[]> {
    return await this.profileService.findAllProfile();
  }

  @Get('getProfile/:id')
  async findProfileById(@Param('id') id: string): Promise<Profile> {
    return await this.profileService.findProfileById(id);
  }

  @Post('/createProfile')
  @UseInterceptors(FileInterceptor('photoUrl'))
  async createProfiles(
    @UploadedFile() photoUrl: Express.Multer.File,
    @Body() profileDto: CreateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.createProfile(profileDto, photoUrl);
  }

  @Put('/updateProfile/:id')
  async updateProfiles(
    @Param('id') id: string,
    @Body() profileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return await this.profileService.updateProfile(id, profileDto);
  }
}
