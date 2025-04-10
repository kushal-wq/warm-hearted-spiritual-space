
export interface PriestProfile {
  id?: string;
  user_id: string;
  name: string;
  description: string;
  specialties: string[];
  experience_years: number;
  avatar_url: string;
  base_price: number;
  availability: string;
  location: string;
  rating?: number;
  created_at?: string;
  updated_at?: string;
}

export interface PriestBooking {
  id?: string;
  user_id: string;
  priest_id: string;
  booking_date: string;
  purpose: string;
  address: string;
  notes?: string;
  price: number;
  status: string; // Changed from union type to string to accommodate any status value
  created_at?: string;
  updated_at?: string;
  profiles?: any; // Added to support the profiles join from Supabase
}

export interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  is_admin: boolean;
  avatar_url?: string | null;
  email?: string;
  is_priest: boolean;
  priest_status: 'pending' | 'approved' | 'rejected' | null;
  created_at?: string;
  updated_at?: string;
}
