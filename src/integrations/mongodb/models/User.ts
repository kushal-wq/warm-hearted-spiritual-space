
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../client';

export interface User {
  _id?: ObjectId;
  email: string;
  password: string; // should be hashed
  firstName: string;
  lastName: string;
  role: 'user' | 'admin';
  profileImage?: string;
  phoneNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export const UserModel = {
  // Get user by email
  getByEmail: async (email: string): Promise<User | null> => {
    const db = await connectToDatabase();
    return db.collection('users').findOne({ email }) as Promise<User | null>;
  },
  
  // Get user by ID
  getById: async (id: string): Promise<User | null> => {
    const db = await connectToDatabase();
    return db.collection('users').findOne({ _id: new ObjectId(id) }) as Promise<User | null>;
  },
  
  // Create a new user
  create: async (user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const db = await connectToDatabase();
    const newUser = {
      ...user,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('users').insertOne(newUser);
    return { ...newUser, _id: result.insertedId } as User;
  },
  
  // Update user
  update: async (id: string, user: Partial<Omit<User, '_id' | 'createdAt' | 'email' | 'role'>>): Promise<User | null> => {
    const db = await connectToDatabase();
    const updatedUser = {
      ...user,
      updatedAt: new Date()
    };
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedUser }
    );
    return db.collection('users').findOne({ _id: new ObjectId(id) }) as Promise<User | null>;
  },
  
  // Delete user
  delete: async (id: string): Promise<boolean> => {
    const db = await connectToDatabase();
    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
};
