import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  summary?: string;

  @Prop({ type: [String] })
  tags?: string[];
}

export const TaskSchema = SchemaFactory.createForClass(Task);
