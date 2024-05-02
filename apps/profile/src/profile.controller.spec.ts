import { Test, TestingModule } from '@nestjs/testing';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { Profile, Gender, Zodiac, Horoscope } from './schemas/profile.schema';
import { CreateProfileDto } from './dto/dto.create';
import { UpdateProfileDto } from './dto/dto.update';

describe('ProfileController', () => {
  let controller: ProfileController;
  let profileService: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfileController],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            findAllProfile: jest.fn(),
            findProfileById: jest.fn(),
            createProfile: jest.fn(),
            updateProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProfileController>(ProfileController);
    profileService = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllProfile', () => {
    it('should return an array of profiles', async () => {
      const profiles: Profile[] = [
        {
          _id: '662e9d90d15d1becb5d3529b',
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
        },
      ];
      jest.spyOn(profileService, 'findAllProfile').mockResolvedValue(profiles);

      expect(await controller.findAllProfile()).toBe(profiles);
    });
  });

  describe('findProfileById', () => {
    it('should return a profile by ID', async () => {
      const profileId = '662e9d90d15d1becb5d3529b';
      const profile: Profile = {
        _id: '662e9d90d15d1becb5d3529b',
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
      };
      jest.spyOn(profileService, 'findProfileById').mockResolvedValue(profile);

      expect(await controller.findProfileById(profileId)).toBe(profile);
      expect(profileService.findProfileById).toHaveBeenCalledWith(profileId);
    });
  });

  describe('createProfiles', () => {
    it('should create a profile', async () => {
      const profileDto: CreateProfileDto = {
        _id: '662e9d90d15d1becb5d3529b',
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
      };

      const photoUrl: Express.Multer.File = {
        fieldname: 'photo',
        originalname: 'test.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        size: 12345,
        destination: '/path/to/uploads',
        filename: 'test.jpg',
        path: '/path/to/uploads/test.jpg',
        stream: null,
        buffer: null,
      };

      const mockProfile: Profile = {
        _id: '662e9d90d15d1becb5d3529b',
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
      };

      jest
        .spyOn(profileService, 'createProfile')
        .mockResolvedValue(mockProfile);

      const result = await controller.createProfiles(photoUrl, profileDto);

      expect(result).toEqual(mockProfile);
      expect(profileService.createProfile).toHaveBeenCalledWith(
        profileDto,
        photoUrl,
      );
    });
  });

  describe('updateProfiles', () => {
    it('should update a profile by ID', async () => {
      const profileId = 'sampleId';
      const updateProfileDto: UpdateProfileDto = {
        _id: '662e9d90d15d1becb5d3529b',
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Rat,
        height: 172,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
      };
      const updatedProfile: Profile = {
        _id: '662e9d90d15d1becb5d3529b',
        name: 'Wahyu',
        gender: Gender.Male,
        birthday: new Date('2002-02-12T00:00:00.000Z'),
        horoscope: Horoscope.Aries,
        zodiac: Zodiac.Rat,
        height: 172,
        weight: 70,
        interests: [],
        createdAt: new Date('2024-04-28T19:03:44.460Z'),
        updatedAt: new Date('2024-04-28T19:03:44.460Z'),
      };
      jest
        .spyOn(profileService, 'updateProfile')
        .mockResolvedValue(updatedProfile);

      expect(await controller.updateProfiles(profileId, updateProfileDto)).toBe(
        updatedProfile,
      );
      expect(profileService.updateProfile).toHaveBeenCalledWith(
        profileId,
        updateProfileDto,
      );
    });
  });
});
