import { Document, Types } from 'mongoose';
import { IUser } from '@/modules/user/user.entities';

export interface IPostModel extends Document {
  title: string
  excerpt: string
  description: string
  imageUrl: string
  shortUrl: string
  writer: string
  isPublished: boolean
  isPinned: boolean
  tags: Types.ObjectId[]
  comments: Types.ObjectId[]
  numViews: Types.ObjectId[]
  hearts: Types.ObjectId[]
  stars: Types.ObjectId[]
  saves: Types.ObjectId[]
  likes: Types.ObjectId[]
  disLikes: Types.ObjectId[]
  creator: IUser,
  createdAt: number
  updatedAt: number
}
