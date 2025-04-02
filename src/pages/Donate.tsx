
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
import { Gift, Heart, TrendingUp, CreditCard, Smartphone, Landmark } from 'lucide-react';
import { toast } from "@/hooks/use-toast";

const donationSchema = z.object({
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: "Please enter a valid amount" }),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  panCard: z.string().optional(),
  anonymous: z.boolean().default(false),
  message: z.string().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const donationTiers = [
  { value: "251", label: "₹251", description: "Diya Offering" },
  { value: "501", label: "₹501", description: "Puja Offering" },
  { value: "1108", label: "₹1,108", description: "Monthly Blessing" },
  { value: "2100", label: "₹2,100", description: "Temple Maintenance" },
  { value: "5100", label: "₹5,100", description: "Sponsor a Festival" },
  { value: "11000", label: "₹11,000", description: "Major Benefactor" },
];

const DonationForm = () => {
  const [customAmount, setCustomAmount] = useState(false);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: "1108",
      name: "",
      email: "",
      phone: "",
      panCard: "",
      anonymous: false,
      message: "",
    },
  });

  const onSubmit = (values: DonationFormValues) => {
    console.log("Donation submitted:", values);
    toast({
      title: "धन्यवाद! Thank you for your donation!",
      description: `Your generous gift of ₹${values.amount} will help support our temple and community programs.`,
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
                className={`h-auto py-3 flex flex-col items-center ${form.watch("amount") === tier.value && !customAmount ? "bg-spiritual-saffron text-white" : "hover:bg-spiritual-sand/30"}`}
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
                  form.setValue("amount", "1108");
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
                      <span className="absolute left-3 top-1/2 -translate-y-1/2">₹</span>
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="+91 98765 43210" type="tel" {...field} />
                </FormControl>
                <FormDescription>
                  For receipt and donation confirmation
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="panCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>PAN Card Number (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="ABCDE1234F" {...field} />
                </FormControl>
                <FormDescription>
                  For 80G tax exemption certificate
                </FormDescription>
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
                    placeholder="Share your thoughts, special intentions, or prayer requests..."
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
          className="w-full bg-spiritual-saffron hover:bg-spiritual-saffron/90 text-white"
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
    <div className="min-h-screen flex flex-col bg-secondary/30">
      <Navbar />
      
      <main className="flex-grow">
        <div className="relative pt-24 pb-12">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 opacity-5">
            <img 
              src="https://cdn.pixabay.com/photo/2020/09/08/08/32/mandala-5553918_960_720.png" 
              alt="Decorative mandala" 
              className="w-full h-full"
            />
          </div>
          <div className="absolute bottom-0 left-0 w-64 h-64 opacity-5">
            <img 
              src="https://cdn.pixabay.com/photo/2020/09/08/08/32/mandala-5553918_960_720.png" 
              alt="Decorative mandala" 
              className="w-full h-full"
            />
          </div>
        
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold font-sanskrit text-foreground mb-2">दान (Donate)</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Your generous contributions help us maintain our sacred spaces, provide spiritual services, and support our community outreach programs.
              </p>
              <div className="mehndi-divider mx-auto max-w-xs"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <Card className="indian-card">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-spiritual-saffron/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Heart className="h-6 w-6 text-spiritual-saffron" />
                  </div>
                  <CardTitle className="font-sanskrit">Daily Temple Rituals</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Your donations help us maintain daily pujas, provide spiritual counseling, and offer ceremonies for the community.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="indian-card">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-spiritual-saffron/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Gift className="h-6 w-6 text-spiritual-saffron" />
                  </div>
                  <CardTitle className="font-sanskrit">Community Service</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    We provide food (prasad), education, and support to those in need. Your generosity makes these programs possible.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="indian-card">
                <CardHeader className="text-center">
                  <div className="w-12 h-12 bg-spiritual-saffron/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-6 w-6 text-spiritual-saffron" />
                  </div>
                  <CardTitle className="font-sanskrit">Temple Expansion</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Help us expand our facilities, create new programs, and reach more people with spiritual wisdom.
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <Card className="border-spiritual-saffron/20 shadow-lg overflow-hidden indian-card">
                <CardHeader>
                  <CardTitle className="text-center text-2xl font-sanskrit">Make a Contribution</CardTitle>
                  <CardDescription className="text-center">
                    Choose your donation method and amount
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="card">Credit/Debit Card</TabsTrigger>
                      <TabsTrigger value="upi">UPI/Mobile</TabsTrigger>
                      <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card">
                      <DonationForm />
                    </TabsContent>
                    
                    <TabsContent value="upi">
                      <div className="space-y-6">
                        <p className="text-muted-foreground text-center">
                          Scan the QR code or use the UPI ID to make your donation
                        </p>
                        <div className="flex flex-col items-center">
                          <div className="w-48 h-48 bg-white p-2 rounded-lg shadow-sm mb-4">
                            {/* This would be a real QR code image in production */}
                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                              QR Code Placeholder
                            </div>
                          </div>
                          <div className="bg-spiritual-saffron/10 px-4 py-2 rounded-lg text-center">
                            <p className="text-spiritual-saffron font-medium">UPI ID: temple@upi</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 mt-6">
                          {["PhonePe", "Google Pay", "Paytm", "BHIM", "Amazon Pay", "WhatsApp Pay"].map((app, index) => (
                            <div key={index} className="p-2 border rounded-lg text-center text-sm text-muted-foreground">
                              {app}
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="bank">
                      <div className="space-y-4">
                        <p className="text-muted-foreground">
                          For bank transfers, please use the following information:
                        </p>
                        <Card className="bg-spiritual-sand/10">
                          <CardContent className="p-4 space-y-2">
                            <p><strong>Bank Name:</strong> Indian Spiritual Trust Bank</p>
                            <p><strong>Account Name:</strong> Divine Temple Trust</p>
                            <p><strong>Account Number:</strong> 1234567890</p>
                            <p><strong>IFSC Code:</strong> ISTB0001234</p>
                            <p><strong>Branch:</strong> Main Branch, Delhi</p>
                            <p><strong>Reference:</strong> Your Name - Donation</p>
                          </CardContent>
                        </Card>
                        <p className="text-sm text-muted-foreground">
                          After making your transfer, please send us an email at donations@divinetemple.in with your transfer details so we can acknowledge your generous support.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="text-center text-sm text-muted-foreground border-t border-spiritual-saffron/10 pt-4">
                  Divine Temple Trust is a registered charitable organization. All donations are tax-deductible under Section 80G of the Income Tax Act.
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Donate;
