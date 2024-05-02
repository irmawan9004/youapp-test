import { AbstractDocument } from '@app/common';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Message extends AbstractDocument {
  @Prop({ required: true })
  content: string;

  @Prop()
  userId: string;
}

const MessageSchema = SchemaFactory.createForClass(Message);

export { MessageSchema };
