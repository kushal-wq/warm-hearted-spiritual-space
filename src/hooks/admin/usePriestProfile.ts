
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const usePriestProfile = () => {
  const { toast } = useToast();

  // Helper function to create priest profile
  const createPriestProfile = async (userId: string) => {
    console.log("Creating priest profile for approved user");
    
    try {
      // Get user's name for the priest profile
      const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('first_name, last_name')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        throw profileError;
      }
      
      console.log("User profile fetched:", userProfile);
      
      // Check if priest profile already exists
      const { data: existingProfile, error: existingError } = await supabase
        .from('priest_profiles')
        .select('id')
        .eq('user_id', userId)
        .maybeSingle();
          
      if (existingError) {
        console.error("Error checking existing priest profile:", existingError);
        throw existingError;
      }
      
      console.log("Existing profile check result:", existingProfile);
          
      if (!existingProfile) {
        console.log("No existing profile found, creating new priest profile");
        
        // Create a new priest profile
        const priestProfileData = {
          user_id: userId,
          name: `${userProfile?.first_name || ''} ${userProfile?.last_name || ''}`.trim() || 'New Priest',
          description: 'Experienced priest specializing in traditional ceremonies.',
          specialties: ['Traditional Rituals', 'Meditation'],
          experience_years: 1,
          base_price: 100,
          avatar_url: '/placeholder.svg',
          availability: 'Weekends and evenings',
          location: 'Delhi'
        };
        
        console.log("Creating priest profile with data:", priestProfileData);
        
        const { data: newProfile, error: insertError } = await supabase
          .from('priest_profiles')
          .insert(priestProfileData)
          .select('*')
          .single();
        
        if (insertError) {
          console.error("Failed to create priest profile:", insertError);
          throw insertError;
        }
        
        console.log("New priest profile created successfully:", newProfile);
      } else {
        console.log("Priest profile already exists, skipping creation");
      }
    } catch (error) {
      console.error("Error in profile creation step:", error);
      throw error;
    }
  };

  return {
    createPriestProfile
  };
};
