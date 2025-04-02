
import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../client';

export interface Event {
  _id?: ObjectId;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  capacity: number;
  registeredCount: number;
  price: number;
  currency: string;
  imageUrl?: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const EventModel = {
  // Get all events
  getAll: async (): Promise<Event[]> => {
    const db = await connectToDatabase();
    return db.collection('events').find().toArray() as Promise<Event[]>;
  },
  
  // Get upcoming events
  getUpcoming: async (): Promise<Event[]> => {
    const db = await connectToDatabase();
    return db.collection('events')
      .find({ startDate: { $gte: new Date() } })
      .sort({ startDate: 1 })
      .toArray() as Promise<Event[]>;
  },
  
  // Get a event by ID
  getById: async (id: string): Promise<Event | null> => {
    const db = await connectToDatabase();
    return db.collection('events').findOne({ _id: new ObjectId(id) }) as Promise<Event | null>;
  },
  
  // Create a new event
  create: async (event: Omit<Event, '_id' | 'createdAt' | 'updatedAt'>): Promise<Event> => {
    const db = await connectToDatabase();
    const newEvent = {
      ...event,
      registeredCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await db.collection('events').insertOne(newEvent);
    return { ...newEvent, _id: result.insertedId } as Event;
  },
  
  // Update an event
  update: async (id: string, event: Partial<Omit<Event, '_id' | 'createdAt'>>): Promise<Event | null> => {
    const db = await connectToDatabase();
    const updatedEvent = {
      ...event,
      updatedAt: new Date()
    };
    await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $set: updatedEvent }
    );
    return db.collection('events').findOne({ _id: new ObjectId(id) }) as Promise<Event | null>;
  },
  
  // Register for an event
  registerAttendee: async (id: string): Promise<boolean> => {
    const db = await connectToDatabase();
    const event = await db.collection('events').findOne({ _id: new ObjectId(id) }) as Event;
    
    if (!event || event.registeredCount >= event.capacity) {
      return false;
    }
    
    await db.collection('events').updateOne(
      { _id: new ObjectId(id) },
      { $inc: { registeredCount: 1 }, $set: { updatedAt: new Date() } }
    );
    
    return true;
  },
  
  // Delete an event
  delete: async (id: string): Promise<boolean> => {
    const db = await connectToDatabase();
    const result = await db.collection('events').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
};
