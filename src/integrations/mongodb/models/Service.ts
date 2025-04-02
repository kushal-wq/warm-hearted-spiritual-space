
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../client';

export interface Service {
  _id?: ObjectId;
  title: string;
  description: string;
  price: number;
  currency: string;
  duration: number; // in minutes
  iconName: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const ServiceModel = {
  // Get all services
  getAll: async (): Promise<Service[]> => {
    const db = await connectToDatabase();
    return db.collection('services').find().toArray() as Promise<Service[]>;
  },
  
  // Get a service by ID
  getById: async (id: string): Promise<Service | null> => {
    const db = await connectToDatabase();
    return db.collection('services').findOne({ _id: new ObjectId(id) }) as Promise<Service | null>;
  },
  
  // Create a new service
  create: async (service: Omit<Service, '_id' | 'createdAt' | 'updatedAt'>): Promise<Service> => {
    const db = await connectToDatabase();
    const newService = {
      ...service,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('services').insertOne(newService);
    return { ...newService, _id: result.insertedId } as Service;
  },
  
  // Update a service
  update: async (id: string, service: Partial<Omit<Service, '_id' | 'createdAt'>>): Promise<Service | null> => {
    const db = await connectToDatabase();
    const updatedService = {
      ...service,
      updatedAt: new Date()
    };
    await db.collection('services').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedService }
    );
    return db.collection('services').findOne({ _id: new ObjectId(id) }) as Promise<Service | null>;
  },
  
  // Delete a service
  delete: async (id: string): Promise<boolean> => {
    const db = await connectToDatabase();
    const result = await db.collection('services').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
};
