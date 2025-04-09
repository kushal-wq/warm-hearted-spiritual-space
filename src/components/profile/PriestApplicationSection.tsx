
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { ClockIcon, CheckCircle, XCircle } from 'lucide-react';

interface PriestApplicationSectionProps {
  userId: string;
  priestStatus: 'pending' | 'approved' | 'rejected' | null;
  refetchProfile: () => void;
}

const PriestApplicationSection = ({ userId, priestStatus, refetchProfile }: PriestApplicationSectionProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    experience: '',
    qualifications: '',
    specialties: '',
  });
  const queryClient = useQueryClient();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.experience || !formData.qualifications || !formData.specialties) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields to apply.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Update the user's profile with priest application status
      const updateData = {
        priest_status: 'pending' as const,
      };

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', userId);
        
      if (error) throw error;
      
      toast({
        title: "Application Submitted",
        description: "Your priest application has been submitted for review.",
      });
      
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      refetchProfile();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit your application. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (priestStatus === 'approved') {
    return (
      <Card className="bg-green-50 border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <CheckCircle className="mr-2 h-5 w-5" /> Priest Status Approved
          </CardTitle>
          <CardDescription className="text-green-700/80">
            You have been approved as a priest. You can access the priest dashboard to manage your services.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            onClick={() => window.location.href = '/priest'}
            className="bg-spiritual-gold hover:bg-spiritual-gold/90"
          >
            Go to Priest Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (priestStatus === 'pending') {
    return (
      <Card className="bg-amber-50 border-amber-100">
        <CardHeader>
          <CardTitle className="flex items-center text-amber-700">
            <ClockIcon className="mr-2 h-5 w-5" /> Priest Application Pending
          </CardTitle>
          <CardDescription className="text-amber-700/80">
            Your application to become a priest is currently under review. We'll notify you when a decision has been made.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }
  
  if (priestStatus === 'rejected') {
    return (
      <Card className="bg-red-50 border-red-100">
        <CardHeader>
          <CardTitle className="flex items-center text-red-700">
            <XCircle className="mr-2 h-5 w-5" /> Application Not Approved
          </CardTitle>
          <CardDescription className="text-red-700/80">
            Unfortunately, your priest application was not approved at this time. You may contact the administrators for more information.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/contact'}
            className="text-red-700 border-red-300 hover:bg-red-100"
          >
            Contact Administration
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Become a Priest</CardTitle>
        <CardDescription>
          Apply to become a priest and offer spiritual services through our platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input 
              id="experience" 
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g., 5 years performing rituals" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="qualifications">Religious Qualifications</Label>
            <Textarea 
              id="qualifications" 
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              placeholder="Describe your religious education and qualifications" 
              required 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="specialties">Ritual Specialties</Label>
            <Textarea 
              id="specialties" 
              name="specialties"
              value={formData.specialties}
              onChange={handleInputChange}
              placeholder="List the ceremonies and rituals you specialize in" 
              required 
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>Submitting <ClockIcon className="ml-2 h-4 w-4 animate-spin" /></>
            ) : (
              'Submit Application'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 border-t pt-4">
        All applications are reviewed by our administrators. You'll be notified once your application is processed.
      </CardFooter>
    </Card>
  );
};

export default PriestApplicationSection;
