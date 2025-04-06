
import { TypedSupabaseClient } from '@/integrations/supabase/types';

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl?: string;
  price?: number;
  isRegistered?: boolean;
  created_at: string;
  updated_at: string;
}

export interface Teaching {
  id: string;
  title: string;
  author: string;
  date: string;
  description: string;
  category: string;
  content: string;
  imageUrl?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceBooking {
  id?: string;
  service_id: string;
  user_id: string;
  booking_date: Date;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at?: string;
  updated_at?: string;
}

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  is_admin?: boolean;
  created_at: string;
  updated_at: string;
}
