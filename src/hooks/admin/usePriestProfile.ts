
import { supabase } from '@/integrations/supabase/client';

export const usePriestProfile = () => {
  const createPriestProfile = async (userId: string) => {
    try {
      console.log("Creating priest profile for user:", userId);
      
      // First, get user info from profiles table
      const { data: userProfile, error: userError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .maybeSingle();
      
      if (userError) {
        console.error("Error fetching user profile:", userError);
        throw userError;
      }
      
      // Check if priest profile already exists (to prevent duplicates)
      const { data: existingProfile, error: checkError } = await supabase
        .from('priest_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
      
      if (checkError) {
        console.error("Error checking for existing priest profile:", checkError);
      }
      
      // If profile exists, don't create a new one
      if (existingProfile) {
        console.log("Priest profile already exists for user:", userId);
        return existingProfile;
      }
      
      // Create a name from available profile data
      const name = userProfile ? 
        `${userProfile.first_name || ''} ${userProfile.last_name || ''}`.trim() || 'New Priest' : 
        'New Priest';
      
      // Create new priest profile
      const { data: priestProfile, error } = await supabase
        .from('priest_profiles')
        .insert({
          user_id: userId,
          name: name,
          description: 'Experienced priest specializing in traditional ceremonies.',
          specialties: ['Traditional Rituals', 'Meditation'],
          experience_years: 1,
          base_price: 100,
          avatar_url: '/placeholder.svg',
          availability: 'Weekends and evenings',
          location: 'Delhi'
        })
        .select()
        .single();
      
      if (error) {
        console.error("Error creating priest profile:", error);
        throw error;
      }
      
      console.log("Successfully created priest profile:", priestProfile);
      return priestProfile;
    } catch (error) {
      console.error("Exception in createPriestProfile:", error);
      throw error;
    }
  };

  return {
    createPriestProfile
  };
};
