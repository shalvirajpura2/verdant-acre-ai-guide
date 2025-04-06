
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, TrendingUp, DollarSign, Calendar, AreaChart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import databaseService, { MarketData } from '@/services/DatabaseService';
import ollamaService from '@/services/OllamaService';

const regions = ["All Regions", "Midwest", "Northeast", "Southeast", "Southwest", "West", "Northwest"];
const demandTrends = ["All Trends", "increasing", "stable", "decreasing"];

const MarketResearcherAgent: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [marketAdvice, setMarketAdvice] = useState<string | null>(null);
  const [marketData, setMarketData] = useState<MarketData[]>([]);
  const [filteredData, setFilteredData] = useState<MarketData[]>([]);
  const [filters, setFilters] = useState({
    region: "All Regions",
    trend: "All Trends",
    searchTerm: ""
  });

  useEffect(() => {
    // Load market data when component mounts
    loadMarketData();
  }, []);

  useEffect(() => {
    // Apply filters when market data or filters change
    applyFilters();
  }, [marketData, filters]);

  const loadMarketData = async () => {
    try {
      const data = await databaseService.getMarketData();
      setMarketData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error loading market data:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load market data. Please try again.",
        variant: "destructive"
      });
    }
  };

  const applyFilters = () => {
    let filtered = [...marketData];
    
    // Apply region filter
    if (filters.region !== "All Regions") {
      filtered = filtered.filter(item => item.region === filters.region);
    }
    
    // Apply trend filter
    if (filters.trend !== "All Trends") {
      filtered = filtered.filter(item => item.demandTrend === filters.trend);
    }
    
    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.cropName.toLowerCase().includes(searchLower)
      );
    }
    
    setFilteredData(filtered);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchTerm: e.target.value }));
  };

  const generateMarketAdvice = async () => {
    setLoading(true);
    setMarketAdvice(null);

    try {
      // Query the Market Researcher agent
      const response = await ollamaService.queryAgent('MarketResearcher', 
        'What are the most profitable crops based on current market trends?', 
        { marketData: filteredData, region: filters.region });

      // Show the response
      setMarketAdvice(response.text);

      toast({
        title: "Market Analysis Complete",
        description: "Market analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Error in market analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Prepare data for charts
  const chartData = filteredData.map(item => ({
    name: item.cropName,
    price: item.currentPrice,
    trend: item.demandTrend === 'increasing' ? 2 : item.demandTrend === 'stable' ? 1 : 0,
  }));

  return (
    <div className="space-y-6">
      <Card className="nature-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-nature-light-green" />
            Market Research
          </CardTitle>
          <CardDescription>
            Analyze current market trends, pricing, and demand forecasts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3 mb-6">
            <div>
              <Label htmlFor="searchCrop">Search Crops</Label>
              <Input
                id="searchCrop"
                className="nature-input"
                placeholder="Search for crops..."
                value={filters.searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div>
              <Label htmlFor="region">Region</Label>
              <Select
                value={filters.region}
                onValueChange={value => setFilters(prev => ({ ...prev, region: value }))}
              >
                <SelectTrigger className="nature-input">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="trend">Demand Trend</Label>
              <Select
                value={filters.trend}
                onValueChange={value => setFilters(prev => ({ ...prev, trend: value }))}
              >
                <SelectTrigger className="nature-input">
                  <SelectValue placeholder="Select trend" />
                </SelectTrigger>
                <SelectContent>
                  {demandTrends.map(trend => (
                    <SelectItem key={trend} value={trend}>
                      {trend === "All Trends" ? trend : 
                       trend === "increasing" ? "Increasing" :
                       trend === "stable" ? "Stable" : "Decreasing"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Tabs defaultValue="chart">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="chart">Price Chart</TabsTrigger>
              <TabsTrigger value="table">Data Table</TabsTrigger>
            </TabsList>
            
            <TabsContent value="chart" className="mt-0">
              <div className="h-[300px] bg-card/50 rounded-md p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="price" name="Price ($/unit)" fill="#8BC34A" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="table" className="mt-0">
              <div className="bg-card/50 rounded-md p-4 max-h-[300px] overflow-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3">Crop</th>
                      <th className="text-right py-2 px-3">Price ($/unit)</th>
                      <th className="text-left py-2 px-3">Demand Trend</th>
                      <th className="text-left py-2 px-3">Region</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.length > 0 ? (
                      filteredData.map((item, index) => (
                        <tr key={index} className="border-b border-border/50 hover:bg-muted/20">
                          <td className="py-2 px-3">{item.cropName}</td>
                          <td className="text-right py-2 px-3">${item.currentPrice.toFixed(2)}</td>
                          <td className="py-2 px-3">
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              item.demandTrend === 'increasing' ? 'bg-green-100 text-green-800' :
                              item.demandTrend === 'stable' ? 'bg-blue-100 text-blue-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {item.demandTrend === 'increasing' ? (
                                <><TrendingUp className="mr-1 h-3 w-3" /> Increasing</>
                              ) : item.demandTrend === 'stable' ? (
                                <><AreaChart className="mr-1 h-3 w-3" /> Stable</>
                              ) : (
                                <><TrendingUp className="mr-1 h-3 w-3 rotate-180" /> Decreasing</>
                              )}
                            </span>
                          </td>
                          <td className="py-2 px-3">{item.region}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="py-4 text-center text-muted-foreground">
                          No market data found for the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <Button variant="outline" onClick={loadMarketData}>
            <Calendar className="h-4 w-4 mr-2" /> Refresh Data
          </Button>
          <Button 
            onClick={generateMarketAdvice} 
            className="bg-nature-light-green hover:bg-nature-light-green/90 text-white"
            disabled={loading || filteredData.length === 0}
          >
            {loading ? (
              <><DollarSign className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
            ) : (
              <><DollarSign className="mr-2 h-4 w-4" /> Generate Market Advice</>
            )}
          </Button>
        </CardFooter>
      </Card>

      {marketAdvice && (
        <Card className="nature-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-nature-pastel-blue" />
              Market Profitability Analysis
            </CardTitle>
            <CardDescription>
              Recommendations for the most profitable crops based on current market trends.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm">
              <div className="bg-accent/20 p-4 rounded-md border border-border">
                {marketAdvice}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MarketResearcherAgent;
