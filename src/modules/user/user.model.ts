import { model, models, Schema } from 'mongoose';
import { IUserModel } from './user.interface';
import { Post } from '@/modules/post/post.model';

const UserSchema = new Schema<IUserModel>({
  alias: {
    type: String,
    required: [true, 'Alias is required'],
    unique: true
  },
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: false,
  },
  isLoginGoogle: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    required: false,
  },
  websiteUrl: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
  school: {
    type: String,
    required: false,
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  profilePhoto: {
    type: String,
    required: false,
  },
  gender: {
    type: String,
    enum: ['female', 'male', 'other'],
    default: 'other',
  },
  birthDay: {
    type: String,
    required: false,
  },
  viewers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    }
  ],
  blocked: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  plan: {
    type: String,
    enum: ['free', 'premium', 'pro'],
    default: 'free',
  },
  userAward: {
    type: String,
    enum: ['bronze', 'silver', 'gold'],
    default: 'bronze',
  },
  roles: {
    type: String,
    enum: ['normal', 'creator', 'admin'],
    default: 'normal',
  },
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
});

/**
 * Hooks
 * Middleware (also called pre and post hooks) are functions which are
 * passed control during execution of asynchronous functions.
 * Middleware is specified on the schema level and is useful for writing plugins.
 */
// UserSchema.pre('findOne',async function(next) {
//   const queryObject = this.getQuery();
//   let userId = queryObject._id;
//
//   if (!userId) return next();
//
//   const lastPost = await Post.findOne({ user: userId });
//   if (lastPost) {
//     const lastPostDate: any = new Date(lastPost?.createdAt);
//     UserSchema.virtual('lastPostDate').get(function() {
//       return `${lastPostDate}`;
//     });
//
//     //---------If check the user is inactive for 30days-----------------
//     const currentDate: any = new Date();
//     const diff = currentDate - lastPostDate;
//     const diffInDays = diff / (1000 * 3600 * 24);
//     UserSchema.virtual('isInactive').get(function() {
//       return diffInDays > 30;
//     });
//     await User.findByIdAndUpdate(
//       userId,
//       {
//         isBlocked: diffInDays > 30,
//       },
//       {
//         new: true,
//       }
//     );
//
//     //--------- Last active date -----------------
//     const daysAgo = Math.floor(diffInDays);
//     UserSchema.virtual('lastActive').get(function() {
//       if (daysAgo <= 0) {
//         return 'Today';
//       } else if (daysAgo === 1) {
//         return 'Yesterday';
//       } else {
//         return `${daysAgo} days ago`;
//       }
//     });
//   }
//
//   //--------- Update userAward based on the number of posts -----------------
//   const numberOfPosts = await Post.countDocuments({ user: userId });
//   let userAward = 'bronze';
//   if (numberOfPosts > 10 && numberOfPosts <= 20) {
//     userAward = 'silver';
//   } else if (numberOfPosts > 20) {
//     userAward = 'gold';
//   }
//
//   await User.findByIdAndUpdate(userId, { userAward }, { new: true });
//
//   next();
// });

/**
 * Virtual is a property that is not stored in MongoDB.
 * Virtuals are typically used for computed properties on documents.
 */
// Get fullName
UserSchema.virtual('fullName').get(function() {
  if (!this?.firstName || !this?.lastName) {
    return;
  }
  return `${this.lastName} ${this.firstName}`;
});

// Get viewers count
UserSchema.virtual('viewerCounts').get(function() {
  if (!this?.viewers) {
    return;
  }
  return this.viewers.length;
});

// Get followers count
UserSchema.virtual('followerCounts').get(function() {
  if (!this?.followers) {
    return;
  }
  return this.followers.length;
});

// Get following count
UserSchema.virtual('followingCounts').get(function() {
  if (!this?.following) {
    return;
  }
  return this.following.length;
});

// Get post count
UserSchema.virtual('postCounts').get(function() {
  if (!this?.posts) {
    return;
  }
  return this.posts.length;
});

// Get blocked count
UserSchema.virtual('blockedCounts').get(function() {
  if (!this?.blocked) {
    return;
  }
  return this.blocked.length;
});

// Compile the user model
export const User = models.User || model<IUserModel>('User', UserSchema);
