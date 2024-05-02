import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsNumberString,
} from 'class-validator';
import Multer from 'multer';

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

enum Zodiac {
  Rat = 'Rat',
  Ox = 'Ox',
  Tiger = 'Tiger',
  Rabbit = 'Rabbit',
  Dragon = 'Dragon',
  Snake = 'Snake',
  Horse = 'Horse',
  Goat = 'Goat',
  Monkey = 'Monkey',
  Rooster = 'Rooster',
  Dog = 'Dog',
  Pig = 'Pig',
}

enum Horoscope {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  _id: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @IsDateString()
  @IsNotEmpty()
  birthday: Date;

  @IsEnum(Zodiac)
  @IsNotEmpty()
  zodiac: Zodiac;

  @IsEnum(Horoscope)
  @IsNotEmpty()
  horoscope: Horoscope;

  @IsNumberString()
  @IsNotEmpty()
  height: number;

  @IsNumberString()
  @IsNotEmpty()
  weight: number;

  interests = [];

  createdAt: Date;
  updatedAt: Date;
}
