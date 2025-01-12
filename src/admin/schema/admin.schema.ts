import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { AdminRole } from 'src/lib/constants';

@Schema({ timestamps: true })
export class Admin extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({
    required: true,
    enum: Object.values(AdminRole),
    default: AdminRole.ADMIN,
  })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
export type AdminDocument = HydratedDocument<Admin>;

AdminSchema.index({ email: 1 });
