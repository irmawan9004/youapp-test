import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other',
}

export enum Zodiac {
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

export enum Horoscope {
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

@Schema({
  versionKey: false,
  timestamps: true,
})
export class Profile extends AbstractDocument {
  @Prop({ required: false })
  photoUrl?: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: Gender.Male | Gender.Female | Gender.Other;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  horoscope: Horoscope;

  @Prop({ required: true })
  zodiac: Zodiac;

  @Prop({ required: true })
  height: number;

  @Prop({ required: true })
  weight: number;

  @Prop()
  interests: string[];

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
