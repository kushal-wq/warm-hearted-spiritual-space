
import { ServiceModel, Service } from '../integrations/mongodb/models/Service';
import { EventModel, Event } from '../integrations/mongodb/models/Event';
import { DonationModel, Donation } from '../integrations/mongodb/models/Donation';
import { UserModel } from '../integrations/mongodb/models/User';

// Services API
export const ServicesAPI = {
  getServices: async (): Promise<Service[]> => {
    try {
      return await ServiceModel.getAll();
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },
  
  getServiceById: async (id: string): Promise<Service | null> => {
    try {
      return await ServiceModel.getById(id);
    } catch (error) {
      console.error(`Error fetching service with ID ${id}:`, error);
      return null;
    }
  }
};

// Events API
export const EventsAPI = {
  getUpcomingEvents: async (): Promise<Event[]> => {
    try {
      return await EventModel.getUpcoming();
    } catch (error) {
      console.error('Error fetching upcoming events:', error);
      return [];
    }
  },
  
  getEventById: async (id: string): Promise<Event | null> => {
    try {
      return await EventModel.getById(id);
    } catch (error) {
      console.error(`Error fetching event with ID ${id}:`, error);
      return null;
    }
  },
  
  registerForEvent: async (eventId: string): Promise<boolean> => {
    try {
      return await EventModel.registerAttendee(eventId);
    } catch (error) {
      console.error(`Error registering for event with ID ${eventId}:`, error);
      return false;
    }
  }
};

// Donations API
export const DonationsAPI = {
  createDonation: async (donationData: Omit<Donation, '_id' | 'createdAt' | 'updatedAt'>): Promise<Donation | null> => {
    try {
      return await DonationModel.create(donationData);
    } catch (error) {
      console.error('Error creating donation:', error);
      return null;
    }
  },
  
  getUserDonations: async (userId: string): Promise<Donation[]> => {
    try {
      return await DonationModel.getByUserId(userId);
    } catch (error) {
      console.error(`Error fetching donations for user with ID ${userId}:`, error);
      return [];
    }
  }
};

// Auth API
export const AuthAPI = {
  register: async (email: string, password: string, firstName: string, lastName: string): Promise<boolean> => {
    try {
      const existingUser = await UserModel.getByEmail(email);
      if (existingUser) {
        return false;
      }
      
      await UserModel.create({
        email,
        password,  // In a real app, you would hash this password!
        firstName,
        lastName,
        role: 'user'
      });
      
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  },
  
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const user = await UserModel.getByEmail(email);
      if (!user) {
        return false;
      }
      
      // In a real app, you would compare hashed passwords
      if (user.password !== password) {
        return false;
      }
      
      // Here you would set up authentication tokens/session
      return true;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  }
};
