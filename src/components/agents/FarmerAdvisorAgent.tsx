
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Leaf, Droplet, Sprout, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { FarmerInput } from '@/services/DatabaseService';
import databaseService from '@/services/DatabaseService';
import ollamaService from '@/services/OllamaService';

const soilTypes = ["Clay", "Clay Loam", "Loam", "Sandy Loam", "Sandy", "Silt Loam", "Silty Clay"];
const regions = ["Midwest", "Northeast", "Southeast", "Southwest", "West", "Northwest"];

const FarmerAdvisorAgent: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [sustainabilityAdvice, setSustainabilityAdvice] = useState<string | null>(null);
  const [formState, setFormState] = useState<FarmerInput>({
    farmerId: `farmer-${Math.floor(Math.random() * 1000)}`,
    landSize: 100,
    soilType: "Loam",
    location: "Midwest",
    waterAvailability: 50,
    preferredCrops: [],
    financialGoal: 40000
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSustainabilityAdvice(null);

    try {
      // Save to database
      await databaseService.saveFarmerInput(formState);

      // Query the Farmer Advisor agent
      const response = await ollamaService.queryAgent('FarmerAdvisor', 
        'What are the most sustainable crops for this land?', formState);

      // Show the response
      setSustainabilityAdvice(response.text);

      toast({
        title: "Analysis Complete",
        description: "Sustainability analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Error in farm analysis:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCropInput = (value: string) => {
    // Split by commas and trim whitespace
    const crops = value.split(',').map(crop => crop.trim()).filter(crop => crop.length > 0);
    setFormState({ ...formState, preferredCrops: crops });
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="nature-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-nature-light-green" />
            Farmer Advisor
          </CardTitle>
          <CardDescription>
            Enter your land data and preferences to receive sustainable farming recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="landSize">Land Size (acres)</Label>
                <Input
                  id="landSize"
                  type="number"
                  min="1"
                  className="nature-input"
                  value={formState.landSize}
                  onChange={e => setFormState({ ...formState, landSize: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="soilType">Soil Type</Label>
                <Select
                  value={formState.soilType}
                  onValueChange={value => setFormState({ ...formState, soilType: value })}
                >
                  <SelectTrigger className="nature-input">
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="location">Region</Label>
                <Select
                  value={formState.location}
                  onValueChange={value => setFormState({ ...formState, location: value })}
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
              <div className="space-y-2">
                <Label htmlFor="financialGoal">Financial Goal ($)</Label>
                <Input
                  id="financialGoal"
                  type="number"
                  min="0"
                  className="nature-input"
                  value={formState.financialGoal}
                  onChange={e => setFormState({ ...formState, financialGoal: parseInt(e.target.value) || 0 })}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="waterAvailability">Water Availability</Label>
                <span className="text-sm text-muted-foreground">{formState.waterAvailability}%</span>
              </div>
              <Slider
                id="waterAvailability"
                defaultValue={[formState.waterAvailability]}
                max={100}
                step={1}
                onValueChange={value => setFormState({ ...formState, waterAvailability: value[0] })}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Limited</span>
                <span>Abundant</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="preferredCrops">Preferred Crops (comma separated)</Label>
              <Textarea
                id="preferredCrops"
                className="nature-input"
                value={formState.preferredCrops.join(', ')}
                onChange={e => handleCropInput(e.target.value)}
                placeholder="Corn, Soybean, Wheat, etc."
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-nature-light-green hover:bg-nature-light-green/90 text-white"
              disabled={loading}
            >
              {loading ? (
                <><Sprout className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
              ) : (
                <><Sprout className="mr-2 h-4 w-4" /> Analyze Sustainability</>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="nature-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Droplet className="h-5 w-5 text-nature-pastel-blue" />
            Sustainability Analysis
          </CardTitle>
          <CardDescription>
            Recommendations for sustainable farming practices based on your land data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sustainabilityAdvice ? (
            <div className="prose prose-sm">
              <div className="bg-accent/20 p-4 rounded-md border border-border">
                {sustainabilityAdvice}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
              <Leaf className="h-12 w-12 mb-4 text-muted-foreground/40" />
              <p>Submit your farm data to receive sustainable farming recommendations.</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-end border-t pt-4">
          {sustainabilityAdvice && (
            <Button variant="outline" onClick={() => {
              toast({
                title: "Analysis Saved",
                description: "Your sustainability analysis has been saved to your account.",
              });
            }}>
              <Send className="h-4 w-4 mr-2" /> Save Analysis
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default FarmerAdvisorAgent;
