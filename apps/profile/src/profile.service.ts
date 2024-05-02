import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/dto.create';
import { UpdateProfileDto } from './dto/dto.update';
import { Express } from 'express';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async findAllProfile(): Promise<Profile[]> {
    const profiles = await this.profileModel.find();
    return profiles;
  }

  async findProfileById(id: string): Promise<Profile> {
    const profile = await this.profileModel.findById(id);
    if (!profile) throw new NotFoundException('Profile not found');
    return profile;
  }

  async createProfile(
    profileDto: CreateProfileDto,
    photoUrl: Express.Multer.File,
  ): Promise<Profile> {
    if (photoUrl) {
      const newProfile = await this.profileModel.create({
        ...profileDto,
        photoUrl: photoUrl.path,
      });
      return newProfile;
    } else {
      const newProfile = await this.profileModel.create(profileDto);
      return newProfile;
    }
  }

  async updateProfile(
    id: string,
    profileDto: UpdateProfileDto,
  ): Promise<Profile> {
    const updatedProfile = await this.profileModel.findByIdAndUpdate(
      id,
      profileDto,
      { new: true, runValidators: true },
    );
    return updatedProfile;
  }
}
