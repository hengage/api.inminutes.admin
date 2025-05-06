import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { VendorAccountStatus } from 'src/lib/constants';
import { v4 as uuidv4 } from 'uuid';

@Schema({ timestamps: true })
export class Vendor extends Document {
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
  businessName: string;

  @Prop({
    required: true,
    trim: true,
  })
  businessLogo: string;

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
    trim: true,
  })
  phoneNumber: string;

  @Prop({
    required: true,
    trim: true,
  })
  password: string; // HASH THIS BEFORE SAVING!

  @Prop({
    required: true,
    trim: true,
  })
  address: string;

  @Prop({
    type: Object,
    required: true,
  })
  location: {
    type: { type: String; enum: ['Point']; default: 'Point' };
    coordinates: [number, number];
  };

  @Prop({
    required: true,
    trim: true,
  })
  residentialAddress: string;

  @Prop({
    required: true,
    trim: true,
  })
  category: string;

  @Prop({
    required: true,
    trim: true,
  })
  subCategory: string;

  @Prop({
    type: [String],
    default: [],
  })
  paymentOptions: string[];

  @Prop({
    type: String,
    enum: VendorAccountStatus,
    default: VendorAccountStatus.InActive,
  })
  accountStatus: string;

  @Prop({
    type: Object,
    default: {
      totalRatingSum: 0,
      ratingCount: 0,
      averageRating: 0,
    },
  })
  rating: {
    totalRatingSum: number;
    ratingCount: number;
    averageRating: number;
  };

  @Prop({
    type: Boolean,
    default: false,
  })
  approved: boolean;

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

export const VendorSchema = SchemaFactory.createForClass(Vendor);
export type VendorDocument = HydratedDocument<Vendor>;

VendorSchema.index({ email: 1 });
VendorSchema.index({ location: '2dsphere' });
