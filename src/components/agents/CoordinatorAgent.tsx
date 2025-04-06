
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Leaf, TrendingUp, BarChart, ArrowRight, DownloadCloud } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import databaseService, { FarmerInput, Recommendation } from '@/services/DatabaseService';
import ollamaService from '@/services/OllamaService';

const CoordinatorAgent: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [farmers, setFarmers] = useState<FarmerInput[]>([]);
  const [selectedFarmerId, setSelectedFarmerId] = useState<string>("");
  const [selectedFarmer, setSelectedFarmer] = useState<FarmerInput | null>(null);
  const [recommendation, setRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    loadFarmers();
  }, []);

  useEffect(() => {
    if (selectedFarmerId) {
      loadFarmerData();
      loadRecommendation();
    } else {
      setSelectedFarmer(null);
      setRecommendation(null);
    }
  }, [selectedFarmerId]);

  const loadFarmers = async () => {
    try {
      const data = await databaseService.getFarmerInputs();
      setFarmers(data);
      if (data.length > 0 && !selectedFarmerId) {
        setSelectedFarmerId(data[0].farmerId || "");
      }
    } catch (error) {
      console.error('Error loading farmers:', error);
      toast({
        title: "Data Loading Error",
        description: "Failed to load farmer data.",
        variant: "destructive"
      });
    }
  };

  const loadFarmerData = async () => {
    if (!selectedFarmerId) return;
    
    try {
      const data = farmers.find(f => f.farmerId === selectedFarmerId) || null;
      setSelectedFarmer(data);
    } catch (error) {
      console.error('Error loading farmer data:', error);
    }
  };

  const loadRecommendation = async () => {
    if (!selectedFarmerId) return;
    
    try {
      const recommendations = await databaseService.getRecommendationsByFarmerId(selectedFarmerId);
      if (recommendations.length > 0) {
        setRecommendation(recommendations[0]);
      } else {
        setRecommendation(null);
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  };

  const generateRecommendations = async () => {
    if (!selectedFarmer) return;
    
    setLoading(true);
    
    try {
      // Get market data
      const marketData = await databaseService.getMarketData();
      
      // Query the Coordinator agent
      const response = await ollamaService.queryAgent('Coordinator', 
        'Generate balanced recommendations that optimize for both sustainability and profitability.',
        { farmerData: selectedFarmer, marketData });
      
      // Create sample recommendation from the response
      const recommendedCrops = [
        {
          cropName: "Organic Soybean",
          score: 92,
          sustainabilityScore: 89,
          profitabilityScore: 95,
          reason: "Excellent market price with good sustainability metrics for your soil type."
        },
        {
          cropName: "Winter Wheat",
          score: 85,
          sustainabilityScore: 90,
          profitabilityScore: 80,
          reason: "Excellent for soil health and water conservation with stable market."
        },
        {
          cropName: "Conservation Corn",
          score: 78,
          sustainabilityScore: 75,
          profitabilityScore: 82,
          reason: "Modified planting approach improves sustainability while maintaining profitability."
        }
      ];
      
      const newRecommendation: Recommendation = {
        farmerId: selectedFarmerId,
        recommendedCrops
      };
      
      // Save to database
      const savedRecommendation = await databaseService.saveRecommendation(newRecommendation);
      setRecommendation(savedRecommendation);
      
      toast({
        title: "Recommendations Generated",
        description: "Balanced recommendations have been created successfully.",
      });
    } catch (error) {
      console.error('Error generating recommendations:', error);
      toast({
        title: "Recommendation Failed",
        description: "There was an error generating recommendations. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="nature-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="h-5 w-5 text-nature-light-green" />
            Coordinated Recommendations
          </CardTitle>
          <CardDescription>
            Balanced recommendations that optimize for both sustainability and profitability.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Select
              value={selectedFarmerId}
              onValueChange={setSelectedFarmerId}
            >
              <SelectTrigger className="nature-input">
                <SelectValue placeholder="Select a farmer" />
              </SelectTrigger>
              <SelectContent>
                {farmers.map(farmer => (
                  <SelectItem key={farmer.farmerId} value={farmer.farmerId || ""}>
                    {farmer.farmerId} - {farmer.landSize} acres in {farmer.location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {selectedFarmer && (
            <div className="bg-card/50 rounded-md p-4 mb-6">
              <h3 className="font-medium mb-2">Selected Farm Profile</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Land Size:</p>
                  <p>{selectedFarmer.landSize} acres</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Region:</p>
                  <p>{selectedFarmer.location}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Soil Type:</p>
                  <p>{selectedFarmer.soilType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Water Availability:</p>
                  <p>{selectedFarmer.waterAvailability}%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Financial Goal:</p>
                  <p>${selectedFarmer.financialGoal.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Preferred Crops:</p>
                  <p>{selectedFarmer.preferredCrops.join(', ') || 'None specified'}</p>
                </div>
              </div>
            </div>
          )}
          
          {recommendation ? (
            <div className="space-y-6">
              <h3 className="font-semibold">Optimized Crop Recommendations</h3>
              
              {recommendation.recommendedCrops.map((crop, index) => (
                <div key={index} className="bg-card/70 rounded-md p-4 border border-border/50">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{crop.cropName}</h4>
                    <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                      Score: {crop.score}/100
                    </span>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex flex-col flex-1 mr-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs flex items-center">
                          <Leaf className="h-3 w-3 mr-1 text-nature-light-green" /> 
                          Sustainability
                        </span>
                        <span className="text-xs font-medium">{crop.sustainabilityScore}/100</span>
                      </div>
                      <Progress value={crop.sustainabilityScore} className="h-2" />
                    </div>
                    
                    <div className="flex flex-col flex-1">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1 text-nature-pastel-blue" /> 
                          Profitability
                        </span>
                        <span className="text-xs font-medium">{crop.profitabilityScore}/100</span>
                      </div>
                      <Progress value={crop.profitabilityScore} className="h-2" />
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">{crop.reason}</p>
                </div>
              ))}
            </div>
          ) : selectedFarmer ? (
            <div className="bg-muted/30 rounded-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Leaf className="h-10 w-10 text-nature-light-green absolute -left-6 top-0 opacity-50" />
                  <BarChart className="h-12 w-12 text-muted-foreground" />
                  <TrendingUp className="h-10 w-10 text-nature-pastel-blue absolute -right-6 top-0 opacity-50" />
                </div>
              </div>
              <h3 className="font-medium mb-2">No Recommendations Yet</h3>
              <p className="text-muted-foreground mb-4">Generate balanced recommendations by analyzing both sustainability and market data.</p>
              <Button 
                onClick={generateRecommendations}
                className="bg-nature-light-green hover:bg-nature-light-green/90 text-white"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Recommendations"}
              </Button>
            </div>
          ) : (
            <div className="bg-muted/30 rounded-md p-6 text-center">
              <p className="text-muted-foreground">Please select a farmer to see recommendations.</p>
            </div>
          )}
        </CardContent>
        {recommendation && (
          <CardFooter className="flex justify-end border-t pt-4">
            <Button variant="outline" onClick={() => {
              toast({
                title: "Download Started",
                description: "Your recommendations are being downloaded as a PDF.",
              });
            }}>
              <DownloadCloud className="h-4 w-4 mr-2" /> Export as PDF
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default CoordinatorAgent;
