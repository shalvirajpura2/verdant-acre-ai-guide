
// This is a mock implementation since we can't use SQLite directly in the browser
// In a real application, this would connect to a backend service or use IndexedDB

export interface FarmerInput {
  id?: number;
  farmerId: string;
  landSize: number;
  soilType: string;
  location: string;
  waterAvailability: number;
  preferredCrops: string[];
  financialGoal: number;
  createdAt?: string;
}

export interface MarketData {
  id?: number;
  cropName: string;
  currentPrice: number;
  demandTrend: "increasing" | "stable" | "decreasing";
  seasonality: string[];
  region: string;
  timestamp?: string;
}

export interface Recommendation {
  id?: number;
  farmerId: string;
  recommendedCrops: Array<{
    cropName: string;
    score: number;
    sustainabilityScore: number;
    profitabilityScore: number;
    reason: string;
  }>;
  createdAt?: string;
}

class DatabaseService {
  private farmerInputs: FarmerInput[] = [];
  private marketData: MarketData[] = [];
  private recommendations: Recommendation[] = [];

  constructor() {
    // Load mock data from localStorage if available
    this.loadFromLocalStorage();
    
    // If no data exists, load some sample data
    if (this.farmerInputs.length === 0) {
      this.loadSampleData();
    }
  }

  private loadFromLocalStorage() {
    try {
      const farmerInputs = localStorage.getItem('farmerInputs');
      const marketData = localStorage.getItem('marketData');
      const recommendations = localStorage.getItem('recommendations');

      if (farmerInputs) this.farmerInputs = JSON.parse(farmerInputs);
      if (marketData) this.marketData = JSON.parse(marketData);
      if (recommendations) this.recommendations = JSON.parse(recommendations);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      localStorage.setItem('farmerInputs', JSON.stringify(this.farmerInputs));
      localStorage.setItem('marketData', JSON.stringify(this.marketData));
      localStorage.setItem('recommendations', JSON.stringify(this.recommendations));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  private loadSampleData() {
    // Sample farmer inputs
    this.farmerInputs = [
      {
        id: 1,
        farmerId: "farmer-001",
        landSize: 150,
        soilType: "Clay Loam",
        location: "Midwest",
        waterAvailability: 75,
        preferredCrops: ["Corn", "Soybean", "Wheat"],
        financialGoal: 50000,
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        farmerId: "farmer-002",
        landSize: 80,
        soilType: "Sandy Loam",
        location: "Southwest",
        waterAvailability: 40,
        preferredCrops: ["Cotton", "Sorghum"],
        financialGoal: 30000,
        createdAt: new Date().toISOString()
      }
    ];

    // Sample market data
    this.marketData = [
      {
        id: 1,
        cropName: "Corn",
        currentPrice: 5.73,
        demandTrend: "increasing",
        seasonality: ["Spring", "Summer"],
        region: "Midwest",
        timestamp: new Date().toISOString()
      },
      {
        id: 2,
        cropName: "Soybean",
        currentPrice: 12.58,
        demandTrend: "stable",
        seasonality: ["Spring", "Summer"],
        region: "Midwest",
        timestamp: new Date().toISOString()
      },
      {
        id: 3,
        cropName: "Wheat",
        currentPrice: 6.84,
        demandTrend: "decreasing",
        seasonality: ["Fall", "Winter"],
        region: "Midwest",
        timestamp: new Date().toISOString()
      },
      {
        id: 4,
        cropName: "Cotton",
        currentPrice: 0.89,
        demandTrend: "increasing",
        seasonality: ["Spring", "Summer"],
        region: "Southwest",
        timestamp: new Date().toISOString()
      },
      {
        id: 5,
        cropName: "Sorghum",
        currentPrice: 4.82,
        demandTrend: "stable",
        seasonality: ["Summer"],
        region: "Southwest",
        timestamp: new Date().toISOString()
      }
    ];

    // Sample recommendations
    this.recommendations = [
      {
        id: 1,
        farmerId: "farmer-001",
        recommendedCrops: [
          {
            cropName: "Soybean",
            score: 85,
            sustainabilityScore: 80,
            profitabilityScore: 90,
            reason: "High market price with good sustainability metrics for your soil type."
          },
          {
            cropName: "Corn",
            score: 78,
            sustainabilityScore: 75,
            profitabilityScore: 82,
            reason: "Good water efficiency and increasing market demand."
          }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    this.saveToLocalStorage();
  }

  // Farmer Input Methods
  async getFarmerInputs(): Promise<FarmerInput[]> {
    return [...this.farmerInputs];
  }

  async getFarmerInputById(id: number): Promise<FarmerInput | undefined> {
    return this.farmerInputs.find(input => input.id === id);
  }

  async saveFarmerInput(input: FarmerInput): Promise<FarmerInput> {
    const newInput = {
      ...input,
      id: input.id || this.farmerInputs.length + 1,
      createdAt: input.createdAt || new Date().toISOString()
    };

    if (input.id) {
      // Update existing
      this.farmerInputs = this.farmerInputs.map(fi => 
        fi.id === input.id ? newInput : fi
      );
    } else {
      // Add new
      this.farmerInputs.push(newInput);
    }

    this.saveToLocalStorage();
    return newInput;
  }

  // Market Data Methods
  async getMarketData(): Promise<MarketData[]> {
    return [...this.marketData];
  }

  async getMarketDataByCrop(cropName: string): Promise<MarketData | undefined> {
    return this.marketData.find(data => data.cropName.toLowerCase() === cropName.toLowerCase());
  }

  async saveMarketData(data: MarketData): Promise<MarketData> {
    const newData = {
      ...data,
      id: data.id || this.marketData.length + 1,
      timestamp: data.timestamp || new Date().toISOString()
    };

    if (data.id) {
      // Update existing
      this.marketData = this.marketData.map(md => 
        md.id === data.id ? newData : md
      );
    } else {
      // Add new
      this.marketData.push(newData);
    }

    this.saveToLocalStorage();
    return newData;
  }

  // Recommendation Methods
  async getRecommendations(): Promise<Recommendation[]> {
    return [...this.recommendations];
  }

  async getRecommendationsByFarmerId(farmerId: string): Promise<Recommendation[]> {
    return this.recommendations.filter(rec => rec.farmerId === farmerId);
  }

  async saveRecommendation(recommendation: Recommendation): Promise<Recommendation> {
    const newRecommendation = {
      ...recommendation,
      id: recommendation.id || this.recommendations.length + 1,
      createdAt: recommendation.createdAt || new Date().toISOString()
    };

    if (recommendation.id) {
      // Update existing
      this.recommendations = this.recommendations.map(rec => 
        rec.id === recommendation.id ? newRecommendation : rec
      );
    } else {
      // Add new
      this.recommendations.push(newRecommendation);
    }

    this.saveToLocalStorage();
    return newRecommendation;
  }
}

// Create a singleton instance
const databaseService = new DatabaseService();
export default databaseService;
