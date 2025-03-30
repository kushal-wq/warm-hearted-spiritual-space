
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DonationsTab = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Overview</CardTitle>
        <CardDescription>Track and manage donations to your organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-white/50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-spiritual-brown/70">Total Donations</p>
                <p className="text-2xl font-bold text-spiritual-brown">$15,245</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white/50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-spiritual-brown/70">Average Donation</p>
                <p className="text-2xl font-bold text-spiritual-brown">$108</p>
                <p className="text-xs text-green-600 mt-1">↑ 5% from last month</p>
              </CardContent>
            </Card>
            <Card className="bg-white/50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-spiritual-brown/70">Total Donors</p>
                <p className="text-2xl font-bold text-spiritual-brown">142</p>
                <p className="text-xs text-green-600 mt-1">↑ 8% from last month</p>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-white/50">
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-spiritual-gold/10">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Amount</th>
                      <th className="text-left p-2">Date</th>
                      <th className="text-left p-2">Status</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="border-b border-spiritual-gold/10">
                        <td className="p-2">Jane Smith</td>
                        <td className="p-2">$108.00</td>
                        <td className="p-2">Nov 15, 2023</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                            Completed
                          </span>
                        </td>
                        <td className="p-2">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default DonationsTab;
