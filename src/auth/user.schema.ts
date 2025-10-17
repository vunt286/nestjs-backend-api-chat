import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as bcrypt from 'bcryptjs';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string;

  @Prop({ unique: true, sparse: true, lowercase: true, trim: true })
  email?: string;

  // store hashed password
  @Prop({ required: true })
  password: string;

  @Prop()
  displayName?: string;

  @Prop()
  avatar?: string;

  // presence / status
  @Prop({ enum: ['online', 'offline'], default: 'offline' })
  status?: 'online' | 'offline';

  @Prop({ type: Date, default: null })
  lastOnline?: Date;

  @Prop({ default: true })
  isActive?: boolean;

  @Prop()
  phone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Pre-save: hash password if modified
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});