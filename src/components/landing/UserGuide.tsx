
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HelpCircle, 
  User, 
  LineChart, 
  ShoppingCart, 
  Settings, 
  ArrowRight 
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const UserGuide = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-8">
        <TabsTrigger value="getting-started" className="flex gap-2 items-center">
          <HelpCircle className="h-4 w-4" />
          <span className="hidden md:inline">Getting Started</span>
        </TabsTrigger>
        <TabsTrigger value="farmer-advisor" className="flex gap-2 items-center">
          <User className="h-4 w-4" />
          <span className="hidden md:inline">Farmer Advisor</span>
        </TabsTrigger>
        <TabsTrigger value="market-research" className="flex gap-2 items-center">
          <LineChart className="h-4 w-4" />
          <span className="hidden md:inline">Market Research</span>
        </TabsTrigger>
        <TabsTrigger value="recommendations" className="flex gap-2 items-center">
          <ShoppingCart className="h-4 w-4" />
          <span className="hidden md:inline">Recommendations</span>
        </TabsTrigger>
        <TabsTrigger value="settings" className="flex gap-2 items-center">
          <Settings className="h-4 w-4" />
          <span className="hidden md:inline">Settings</span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="getting-started" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Welcome to Verdant Acre</h3>
          <p>This guide will help you get started with our sustainable farming AI system.</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-md font-medium">System Overview</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">Verdant Acre uses multi-agent AI to provide you with:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
                  <li>Sustainable farming recommendations</li>
                  <li>Market trend analysis</li>
                  <li>Balanced profit and sustainability suggestions</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-md font-medium">How to Log In</AccordionTrigger>
              <AccordionContent>
                <p>Click the "Login" button in the top right corner and enter your email and password. If you don't have an account, you can sign up for one.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-md font-medium">Navigating the Dashboard</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">The main dashboard provides an overview of your farm data and recommendations. From here you can:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
                  <li>View sustainability metrics</li>
                  <li>Check market conditions</li>
                  <li>See AI-generated recommendations</li>
                  <li>Access detailed reports</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent value="farmer-advisor" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Farmer Advisor</h3>
          <p>Learn how to use the Farmer Advisor to get sustainable crop recommendations.</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="input-data">
              <AccordionTrigger className="text-md font-medium">Inputting Your Farm Data</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">To get personalized recommendations, you'll need to provide:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
                  <li>Land size and characteristics</li>
                  <li>Current crop rotation</li>
                  <li>Soil health indicators</li>
                  <li>Water availability</li>
                  <li>Financial goals</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sustainability">
              <AccordionTrigger className="text-md font-medium">Understanding Sustainability Metrics</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">The system analyzes several sustainability factors:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
                  <li>Water usage efficiency</li>
                  <li>Carbon footprint</li>
                  <li>Soil health improvement</li>
                  <li>Biodiversity impact</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="recommendations">
              <AccordionTrigger className="text-md font-medium">Interpreting Recommendations</AccordionTrigger>
              <AccordionContent>
                <p>Each recommendation includes detailed explanations of the suggested crops, rotation schedules, and expected sustainability improvements. You can compare different scenarios and see the long-term impact on your land.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent value="market-research" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Market Research</h3>
          <p>Learn how the Market Researcher analyzes trends to maximize your profits.</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="market-data">
              <AccordionTrigger className="text-md font-medium">Market Data Analysis</AccordionTrigger>
              <AccordionContent>
                <p>The system continuously analyzes regional market trends, pricing fluctuations, and demand forecasts to identify the most profitable crops for your region.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="profitability">
              <AccordionTrigger className="text-md font-medium">Profitability Projections</AccordionTrigger>
              <AccordionContent>
                <p>View detailed projections that show expected revenue, costs, and profits for different crop choices over multiple seasons.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="market-trends">
              <AccordionTrigger className="text-md font-medium">Understanding Market Trends</AccordionTrigger>
              <AccordionContent>
                <p className="mb-2">The system helps you understand:</p>
                <ul className="list-disc list-inside pl-2 space-y-1 text-muted-foreground">
                  <li>Seasonal price fluctuations</li>
                  <li>Emerging consumer preferences</li>
                  <li>Supply chain considerations</li>
                  <li>Long-term market shifts</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent value="recommendations" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Balanced Recommendations</h3>
          <p>Discover how the Coordinator Agent balances sustainability and profitability.</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="balancing">
              <AccordionTrigger className="text-md font-medium">Balancing Priorities</AccordionTrigger>
              <AccordionContent>
                <p>The Coordinator Agent weighs sustainability factors against market profitability to provide recommendations that achieve your financial goals while protecting your land for the future.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="implementation">
              <AccordionTrigger className="text-md font-medium">Implementation Strategies</AccordionTrigger>
              <AccordionContent>
                <p>Get step-by-step guidance on how to implement the recommended changes, including transition plans for shifting to new crops or practices.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="long-term">
              <AccordionTrigger className="text-md font-medium">Long-term Planning</AccordionTrigger>
              <AccordionContent>
                <p>View multi-year projections that show how recommendations will affect your farm's sustainability and profitability over time, helping you make decisions that balance short-term needs with long-term goals.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="focus-visible:outline-none focus-visible:ring-0">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Settings & Preferences</h3>
          <p>Configure the system to match your specific farming approach and priorities.</p>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="account">
              <AccordionTrigger className="text-md font-medium">Account Management</AccordionTrigger>
              <AccordionContent>
                <p>Update your profile information, change your password, and manage notification preferences to stay informed about important updates and recommendations.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="priorities">
              <AccordionTrigger className="text-md font-medium">Setting Priorities</AccordionTrigger>
              <AccordionContent>
                <p>Adjust the weighting between sustainability and profitability to ensure recommendations align with your values and business goals.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="data">
              <AccordionTrigger className="text-md font-medium">Data Management</AccordionTrigger>
              <AccordionContent>
                <p>Import or export farm data, view your recommendation history, and manage integrations with other farm management systems you might be using.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default UserGuide;
