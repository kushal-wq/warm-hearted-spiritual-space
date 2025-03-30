
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Gift, Heart, TrendingUp } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const donationSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid amount" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  anonymous: z.boolean().default(false),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const donationTiers = [
  { value: "21", label: "$21", description: "Supports daily temple offerings" },
  { value: "51", label: "$51", description: "Helps maintain our sacred spaces" },
  { value: "108", label: "$108", description: "Sponsors a spiritual workshop" },
  { value: "251", label: "$251", description: "Funds a community outreach program" },
  { value: "501", label: "$501", description: "Sponsors a major temple ceremony" },
  { value: "1008", label: "$1,008", description: "Becomes a major annual benefactor" },
];

const DonationForm = () => {
  const [customAmount, setCustomAmount] = useState(false);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "21",
      name: "",
      email: "",
      anonymous: false,
      message: "",
    },
  });

  const onSubmit = (values: DonationFormValues) => {
    console.log("Donation submitted:", values);
    toast({
      title: "Thank you for your donation!",
      description: `Your generous gift of $${values.amount} will help support our mission.`,
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3">
          <FormLabel>Select Donation Amount</FormLabel>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {donationTiers.map((tier) => (
              <Button
                key={tier.value}
                type="button"
                variant={form.watch("amount") === tier.value && !customAmount ? "default" : "outline"}
                className={`h-auto py-3 flex flex-col items-center ${form.watch("amount") === tier.value && !customAmount ? "bg-spiritual-gold text-white" : "hover:bg-spiritual-sand/30"}`}
                onClick={() => {
                  form.setValue("amount", tier.value);
                  setCustomAmount(false);
                }}
              >
                <span className="text-lg font-bold">{tier.label}</span>
                <span className="text-xs mt-1">{tier.description}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 mt-3">
            <Checkbox 
              id="customAmount" 
              checked={customAmount}
              onCheckedChange={(checked) => {
                setCustomAmount(checked as boolean);
                if (checked) {
                  form.setValue("amount", "");
                } else {
                  form.setValue("amount", "21");
                }
              }}
            />
            <label htmlFor="customAmount" className="text-sm font-medium leading-none cursor-pointer">
              Enter custom amount
            </label>
          </div>
          
          {customAmount && (
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">$</span>
                      <Input
                        {...field}
                        placeholder="Enter amount"
                        type="text"
                        inputMode="decimal"
                        className="pl-7"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="your.email@example.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="anonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Make my donation anonymous</FormLabel>
                  <FormDescription>
                    Your name will not be displayed publicly in our donor list.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message (Optional)</FormLabel>
                <FormControl>
                  <textarea
                    className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Share your thoughts or special instructions for your donation..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-spiritual-gold hover:bg-spiritual-gold/90"
          size="lg"
        >
          <Heart className="mr-2 h-4 w-4" /> Complete Donation
        </Button>
      </form>
    </Form>
  );
};

const Donate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-spiritual-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold font-sanskrit text-spiritual-brown mb-4">Support Our Mission</h1>
            <p className="text-xl text-spiritual-brown/80 max-w-3xl mx-auto">
              Your generous donations help us maintain our sacred spaces, provide spiritual services, and support our community outreach programs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <Card className="bg-white/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-spiritual-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Heart className="h-6 w-6 text-spiritual-gold" />
                </div>
                <CardTitle className="text-spiritual-brown">Support Spiritual Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-spiritual-brown/80">
                  Your donations help us maintain daily rituals, provide spiritual counseling, and offer ceremonies for the community.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-spiritual-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Gift className="h-6 w-6 text-spiritual-gold" />
                </div>
                <CardTitle className="text-spiritual-brown">Community Outreach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-spiritual-brown/80">
                  We provide food, education, and support to those in need. Your generosity makes these programs possible.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-spiritual-gold/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="h-6 w-6 text-spiritual-gold" />
                </div>
                <CardTitle className="text-spiritual-brown">Growth & Expansion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-spiritual-brown/80">
                  Help us expand our facilities, create new programs, and reach more people with spiritual wisdom.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <Card className="border-spiritual-gold/20 shadow-lg">
              <CardHeader>
                <CardTitle className="text-center text-2xl text-spiritual-brown">Make a Donation</CardTitle>
                <CardDescription className="text-center">
                  Choose your donation method and amount
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="card" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="card">Credit Card</TabsTrigger>
                    <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="card">
                    <DonationForm />
                  </TabsContent>
                  
                  <TabsContent value="bank">
                    <div className="space-y-4">
                      <p className="text-spiritual-brown/80">
                        For bank transfers, please use the following information:
                      </p>
                      <Card className="bg-spiritual-sand/10">
                        <CardContent className="p-4 space-y-2">
                          <p><strong>Bank Name:</strong> Spiritual Trust Bank</p>
                          <p><strong>Account Name:</strong> Divine Guidance Temple</p>
                          <p><strong>Account Number:</strong> 1234567890</p>
                          <p><strong>Routing Number:</strong> 987654321</p>
                          <p><strong>Reference:</strong> Your Name - Donation</p>
                        </CardContent>
                      </Card>
                      <p className="text-sm text-spiritual-brown/70">
                        After making your transfer, please send us an email at donations@divineguidance.com with your transfer details so we can acknowledge your generous support.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter className="text-center text-sm text-spiritual-brown/70 border-t border-spiritual-gold/10 pt-4">
                Divine Guidance is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the extent allowed by law.
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
