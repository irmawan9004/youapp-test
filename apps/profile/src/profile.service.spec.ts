import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { getModelToken } from '@nestjs/mongoose';
import { Profile, Gender, Horoscope, Zodiac } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateProfileDto } from './dto/dto.create';
import { UpdateProfileDto } from './dto/dto.update';
import { NotFoundException } from '@nestjs/common';

describe('ProfileService', () => {
  let service: ProfileService;
  let profileModel: Model<Profile>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: getModelToken(Profile.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    profileModel = module.get<Model<Profile>>(getModelToken(Profile.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllProfile', () => {
    it('should return an array of profiles', async () => {
      const profiles: Profile[] = [
        {
          name: 'Wahyu',
          gender: Gender.Male,
          birthday: new Date('2002-02-12T00:00:00.000Z'),
          horoscope: Horoscope.Aries,
          zodiac: Zodiac.Rat,
          height: 175,
          weight: 70,
          interests: [],
          createdAt: new Date('2024-04-28T19:03:44.460Z'),
          updatedAt: new Date('2024-04-28T19:03:44.460Z'),
          photoUrl: 'https://example.com/photo.jpg',
        },
      ];
      jest.spyOn(profileModel, 'find').mockResolvedValue(profiles);
      expect(await service.findAllProfile()).toEqual(profiles);
    });
  });

  describe('findProfileById', () => {
    it('should return a profile when given a valid ID', async () => {
      const profileId = '662e9d90d15d1becb5d3529b';
      const profile: Profile = {
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Rat,
        height: 175,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
        photoUrl: 'https://example.com/photo.jpg',
      };
      jest.spyOn(profileModel, 'findById').mockResolvedValue(profile);
      expect(await service.findProfileById(profileId)).toEqual(profile);
    });

    it('should throw NotFoundException when given an invalid ID', async () => {
      const invalidProfileId = '662e96c2a0a503d71bd19661';
      jest.spyOn(profileModel, 'findById').mockResolvedValue(null);
      await expect(
        service.findProfileById(invalidProfileId),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should update a profile', async () => {
      const profileId = 'valid-id';
      const updateProfileDto: UpdateProfileDto = {
        _id: 'valid-id',
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Dragon,
        height: 175,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
        photoUrl: 'https://example.com/photo.jpg',
      };
      const updatedProfile: Profile = {
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Dragon,
        height: 175,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
        photoUrl: 'https://example.com/photo.jpg',
      };
      jest
        .spyOn(profileModel, 'findByIdAndUpdate')
        .mockResolvedValue(updatedProfile);
      expect(await service.updateProfile(profileId, updateProfileDto)).toEqual(
        updatedProfile,
      );
    });
  });

  describe('createProfile', () => {
    it('should create and return a profile with photoUrl', async () => {
      const createProfileDto: CreateProfileDto = {
        _id: '1',
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Dragon,
        height: 175,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
        photoUrl: 'https://example.com/photo.jpg',
      };
      const mockPhotoUrl: Express.Multer.File = {
        path: 'https://example.com/photo.jpg',
        originalname: 'photo.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 1024,
        fieldname: 'photo',
        destination: '/tmp',
        filename: 'photo.jpg',
        stream: null,
        buffer: null,
      };
      const mockProfile: Profile = {
        ...createProfileDto,
        photoUrl: mockPhotoUrl.path,
      };

      jest.spyOn(profileModel, 'create').mockResolvedValue(mockProfile as any);

      const result = await service.createProfile(
        createProfileDto,
        mockPhotoUrl,
      );
      expect(result).toEqual(mockProfile);
    });

    it('should create and return a profile without photoUrl if no photoUrl provided', async () => {
      const createProfileDto: CreateProfileDto = {
        _id: '1',
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Dragon,
        height: 175,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
        photoUrl: 'https://example.com/photo.jpg',
      };
      const mockProfile: Profile = { ...createProfileDto };

      jest.spyOn(profileModel, 'create').mockResolvedValue(mockProfile as any);

      const result = await service.createProfile(createProfileDto, null);
      expect(result).toEqual(mockProfile);
    });
  });
});

// describe('createProfile', () => {
//   it('should create a new profile', async () => {
//     const createProfileDto: CreateProfileDto = {
//       name: 'Komeng',
//       gender: Gender.Male,
//       birthday: new Date('2002-02-12T00:00:00.000Z'),
//       horoscope: Horoscope.Aries,
//       zodiac: Zodiac.Rat,
//       height: 175,
//       weight: 70,
//       interests: ['Hiking', 'Streaming', 'Swimming'],
//     };
//     const newProfile: Profile = {
//       _id: '662e9d90d15d1becb5d3529b',
//       name: 'Komeng',
//       gender: Gender.Male,
//       birthday: new Date('2002-02-12T00:00:00.000Z'),
//       horoscope: Horoscope.Aries,
//       zodiac: Zodiac.Rat,
//       height: 175,
//       weight: 70,
//       interests: ['Hiking', 'Streaming', 'Swimming'],
//       createdAt: new Date('2024-04-28T19:03:44.460Z'),
//       updatedAt: new Date('2024-04-28T19:03:44.460Z'),
//     };
//     jest.spyOn(profileModel, 'create').mockResolvedValue([newProfile]);
//     expect(await service.createProfile(createProfileDto)).toEqual(newProfile);
//   });
// });
