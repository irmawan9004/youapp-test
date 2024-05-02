import {
  IsString,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsNotEmpty,
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

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  _id?: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  @IsOptional()
  @IsEnum(Zodiac)
  zodiac: Zodiac;

  @IsOptional()
  @IsEnum(Horoscope)
  horoscope: Horoscope;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  interests: [];

  createdAt: Date;
  updatedAt: Date;
}
