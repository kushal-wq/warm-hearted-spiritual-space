
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../client';

export interface Donation {
  _id?: ObjectId;
  userId?: string;
  amount: number;
  currency: string;
  donationType: 'one-time' | 'monthly' | 'yearly';
  category: 'diya' | 'seva' | 'temple' | 'other';
  message?: string;
  anonymous: boolean;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const DonationModel = {
  // Get all donations
  getAll: async (): Promise<Donation[]> => {
    const db = await connectToDatabase();
    return db.collection('donations')
      .find()
      .sort({ createdAt: -1 })
      .toArray() as Promise<Donation[]>;
  },
  
  // Get donations by user ID
  getByUserId: async (userId: string): Promise<Donation[]> => {
    const db = await connectToDatabase();
    return db.collection('donations')
      .find({ userId })
      .sort({ createdAt: -1 })
      .toArray() as Promise<Donation[]>;
  },
  
  // Get a donation by ID
  getById: async (id: string): Promise<Donation | null> => {
    const db = await connectToDatabase();
    return db.collection('donations').findOne({ _id: new ObjectId(id) }) as Promise<Donation | null>;
  },
  
  // Create a new donation
  create: async (donation: Omit<Donation, '_id' | 'createdAt' | 'updatedAt'>): Promise<Donation> => {
    const db = await connectToDatabase();
    const newDonation = {
      ...donation,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('donations').insertOne(newDonation);
    return { ...newDonation, _id: result.insertedId } as Donation;
  },
  
  // Update a donation status
  updateStatus: async (id: string, status: 'pending' | 'completed' | 'failed', transactionId?: string): Promise<Donation | null> => {
    const db = await connectToDatabase();
    const updates: any = {
      status,
      updatedAt: new Date()
    };
    
    if (transactionId) {
      updates.transactionId = transactionId;
    }
    
    await db.collection('donations').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    
    return db.collection('donations').findOne({ _id: new ObjectId(id) }) as Promise<Donation | null>;
  }
};
