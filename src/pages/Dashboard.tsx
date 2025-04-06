
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PageLayout from '@/components/layout/PageLayout';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ChevronRight, CheckCircle2, Users, Droplet, Sprout, TreePine, BarChart2, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Sample data for the pie chart
  const sustainabilityData = [
    { name: 'Water Conservation', value: 38, color: '#BBDEFB' },
    { name: 'Soil Health', value: 32, color: '#8BC34A' },
    { name: 'Carbon Reduction', value: 18, color: '#DCEDC8' },
    { name: 'Biodiversity', value: 12, color: '#795548' },
  ];

  // Sample recent recommendations
  const recentRecommendations = [
    { id: 1, farmerId: 'farmer-001', date: '2025-04-02', status: 'Complete', crops: ['Organic Soybean', 'Winter Wheat'] },
    { id: 2, farmerId: 'farmer-002', date: '2025-04-01', status: 'Complete', crops: ['Sorghum', 'Millet'] },
  ];

  return (
    <PageLayout title="Sustainable Farming Dashboard" subtitle="Multi-agent AI system for balancing sustainability and profitability">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="nature-card col-span-full md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-nature-light-green" />
              Sustainability Impact
            </CardTitle>
            <CardDescription>Overall sustainability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sustainabilityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {sustainabilityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="nature-card col-span-full md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <BarChart2 className="mr-2 h-5 w-5 text-nature-light-green" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRecommendations.map((rec) => (
                <div key={rec.id} className="flex items-start border-b pb-3 border-border/50 last:border-0 last:pb-0">
                  <div className="bg-primary/10 rounded-full p-2 mr-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{rec.farmerId}</h4>
                      <span className="text-xs text-muted-foreground">{rec.date}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Recommended: {rec.crops.join(', ')}
                    </p>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" size="sm" className="w-full justify-between" asChild>
                <Link to="/recommendations">
                  View all recommendations
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="nature-card col-span-full md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Sprout className="mr-2 h-5 w-5 text-nature-light-green" />
              Quick Actions
            </CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/farmer-advisor">
                  <Users className="mr-2 h-4 w-4 text-nature-light-green" />
                  Farmer Advisor
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/market-researcher">
                  <BarChart2 className="mr-2 h-4 w-4 text-nature-pastel-blue" />
                  Market Research
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/recommendations">
                  <TreePine className="mr-2 h-4 w-4 text-nature-earth-brown" />
                  View Recommendations
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Droplet className="mr-2 h-4 w-4 text-nature-pastel-blue" />
                Water Optimization
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
            
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card className="nature-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TreePine className="mr-2 h-5 w-5 text-nature-earth-brown" />
              About Verdant Acre AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm">
              <p>
                Verdant Acre is a multi-agent AI system designed to help farmers make sustainable and profitable decisions.
                Our system combines environmental sustainability with market profitability to provide balanced recommendations.
              </p>
              <h4>Our Agents:</h4>
              <ul>
                <li><strong>Farmer Advisor:</strong> Analyzes land data to recommend sustainable farming practices.</li>
                <li><strong>Market Researcher:</strong> Provides insights on market trends and profitability.</li>
                <li><strong>Coordinator:</strong> Balances sustainability and profitability for optimal recommendations.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card className="nature-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Leaf className="mr-2 h-5 w-5 text-nature-light-green" />
              Getting Started
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex">
                <div className="bg-nature-pale-green rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">
                  <span className="font-medium">1</span>
                </div>
                <div>
                  <h4 className="font-medium">Input Your Farm Data</h4>
                  <p className="text-sm text-muted-foreground">
                    Start by entering your land data and preferences in the Farmer Advisor.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-nature-pale-green rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">
                  <span className="font-medium">2</span>
                </div>
                <div>
                  <h4 className="font-medium">Explore Market Research</h4>
                  <p className="text-sm text-muted-foreground">
                    Review current market trends and profitability data.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="bg-nature-pale-green rounded-full h-8 w-8 flex items-center justify-center mr-3 shrink-0">
                  <span className="font-medium">3</span>
                </div>
                <div>
                  <h4 className="font-medium">Get Balanced Recommendations</h4>
                  <p className="text-sm text-muted-foreground">
                    View optimized recommendations that balance sustainability and profitability.
                  </p>
                </div>
              </div>
              
              <Button asChild className="w-full mt-2 bg-nature-light-green hover:bg-nature-light-green/90 text-white">
                <Link to="/farmer-advisor">
                  Get Started Now
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
