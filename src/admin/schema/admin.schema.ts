import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { AdminRole } from 'src/lib/constants';
import { v4 as uuidv4 } from 'uuid';
@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({
    type: String,
    default: () => uuidv4(),
  })
  _id: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    set: (value: string) => value.toLowerCase(),
  })
  firstName: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
    set: (value: string) => value.toLowerCase(),
  })
  lastName: string;

  @Prop({
    required: true,
    trim: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    set: (value: string) => value.toLowerCase(),
  })
  email: string;

  @Prop({
    required: true,
    enum: Object.values(AdminRole),
    default: AdminRole.ADMIN,
  })
  role: AdminRole;

  @Prop({
    type: String,
    default: null,
    select: false,
  })
  otpSecret: string | null;

  @Prop({
    type: Date,
    default: null,
  })
  otpExpiresAt: Date | null;

  @Prop({
    type: Object,
    default: null,
  })
  deleted: {
    deletedAt: Date | null;
    deletedBy: string | null;
    reason: string | null;
  };
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
export type AdminDocument = HydratedDocument<Admin>;

AdminSchema.index({ email: 1 });
