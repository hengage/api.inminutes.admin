import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';
import { AdminRole } from 'src/lib/constants';

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    enum: Object.values(AdminRole),
    default: AdminRole.ADMIN,
  })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.index({ email: 1 });

AdminSchema.pre('save', async function (next: NextFunction) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});
