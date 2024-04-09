import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class BaseSchema {
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

@Schema({ timestamps: true })
export class Task extends BaseSchema {
  @Prop({ required: true, unique: true })
  publicId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  summary?: string;

  @Prop({ type: [String] })
  tags?: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
