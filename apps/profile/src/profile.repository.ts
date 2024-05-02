import { AbstractRepository } from '@app/common';
import { Injectable } from '@nestjs/common';
import { Profile } from './schemas/profile.schema';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Logger } from '@nestjs/common';

@Injectable()
export class ProfileRepository extends AbstractRepository<Profile> {
  protected readonly logger = new Logger(ProfileRepository.name);
  constructor(
    @InjectModel(Profile.name) profileModel: Model<Profile>,
    @InjectConnection() connection: Connection,
  ) {
    super(profileModel, connection);
  }
}
