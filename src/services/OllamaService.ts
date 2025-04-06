
// This is a mock implementation of the Ollama integration
// In a real application, this would connect to a local Ollama instance or API

export interface AgentResponse {
  text: string;
  reasoning?: string;
  confidence?: number;
}

type AgentType = 'FarmerAdvisor' | 'MarketResearcher' | 'Coordinator';

class OllamaService {
  private readonly MODELS = {
    FarmerAdvisor: 'llama3',
    MarketResearcher: 'llama3',
    Coordinator: 'llama3'
  };

  private isSimulating = true; // Set to false when connecting to a real Ollama instance

  constructor() {
    // Check if Ollama is available (this is mocked)
    this.checkOllamaAvailability();
  }

  private async checkOllamaAvailability(): Promise<boolean> {
    try {
      // In a real implementation, we would check the Ollama server status
      // For this mock, we'll just assume it's not available
      console.log('Checking Ollama availability...');
      return false;
    } catch (error) {
      console.error('Ollama service is not available:', error);
      return false;
    }
  }

  async queryAgent(
    agentType: AgentType, 
    prompt: string, 
    context?: Record<string, any>
  ): Promise<AgentResponse> {
    if (!this.isSimulating) {
      try {
        // This would be a real implementation connecting to Ollama
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: this.MODELS[agentType],
            prompt: this.constructPrompt(agentType, prompt, context),
            stream: false,
          }),
        });

        if (!response.ok) {
          throw new Error(`Ollama API error: ${response.statusText}`);
        }

        const data = await response.json();
        return this.parseResponse(data.response);
      } catch (error) {
        console.error('Error querying Ollama:', error);
        return this.getSimulatedResponse(agentType, prompt, context);
      }
    } else {
      // Use simulated responses for development
      return this.getSimulatedResponse(agentType, prompt, context);
    }
  }

  private constructPrompt(agentType: AgentType, prompt: string, context?: Record<string, any>): string {
    let systemPrompt = '';
    
    switch (agentType) {
      case 'FarmerAdvisor':
        systemPrompt = `You are a Farmer Advisor specialized in sustainable agriculture. 
        Your task is to analyze the farmer's land data and preferences to suggest the most sustainable crops.
        Focus on water conservation, soil health improvement, and minimizing carbon footprint.
        Provide specific, actionable advice.`;
        break;
      case 'MarketResearcher':
        systemPrompt = `You are a Market Researcher focusing on agricultural commodities. 
        Analyze current market trends, pricing, and demand forecasts to recommend the most profitable crops.
        Your recommendations should be data-driven and consider regional factors.`;
        break;
      case 'Coordinator':
        systemPrompt = `You are a Coordinator that balances sustainability and profitability in agriculture.
        Analyze the recommendations from both sustainability and market perspectives.
        Provide a balanced final recommendation that optimizes both factors.`;
        break;
    }

    return `${systemPrompt}\n\nFARMER DATA:\n${JSON.stringify(context)}\n\nQUESTION: ${prompt}`;
  }

  private parseResponse(rawResponse: string): AgentResponse {
    // In a real implementation, we would parse structured responses
    // For this mock, we'll just return the raw text
    return {
      text: rawResponse,
      confidence: 0.85, // Mock confidence score
    };
  }

  private getSimulatedResponse(agentType: AgentType, prompt: string, context?: Record<string, any>): AgentResponse {
    // Generate deterministic but varied responses based on input
    const responses: Record<AgentType, AgentResponse[]> = {
      FarmerAdvisor: [
        {
          text: `Based on your soil type (${context?.soilType || 'loam'}) and water availability (${context?.waterAvailability || 'medium'}), I recommend focusing on drought-resistant crops like sorghum and millet. These require 30% less water than traditional crops while maintaining good yields. Additionally, consider implementing cover cropping with legumes to improve soil nitrogen content naturally.`,
          reasoning: "The recommendation prioritizes water conservation while improving soil health through nitrogen fixation.",
          confidence: 0.88
        },
        {
          text: `For your region, crop rotation between soybeans and small grains would significantly improve soil health. This rotation can reduce erosion by 40% and naturally breaks pest cycles, reducing the need for pesticides. Consider reduced tillage practices to maintain soil structure and carbon sequestration.`,
          reasoning: "This approach focuses on long-term soil sustainability while maintaining productive yields.",
          confidence: 0.92
        }
      ],
      MarketResearcher: [
        {
          text: `Current market analysis shows strong price trends for organic specialty grains (+15% YoY). With your location, focusing on spelt or emmer wheat could yield 20-30% premium over conventional crops. Regional demand from artisanal bakeries remains strong, with contracted purchases available through Organic Valley cooperative.`,
          reasoning: "Market premium for specialty grains outweighs slightly lower yields, maximizing profit per acre.",
          confidence: 0.86
        },
        {
          text: `Regional data indicates a growing market for pulses (lentils, chickpeas) with prices up 12% this season. Processing facilities within 100 miles of your location reduce transportation costs. Consider contracted growing which currently offers $0.42/lb with minimum quality standards.`,
          reasoning: "Proximity to processing facilities creates a logistical advantage for these crops in your region.",
          confidence: 0.89
        }
      ],
      Coordinator: [
        {
          text: `Balancing both sustainability and profitability, I recommend a split strategy: dedicate 60% of your acreage to drought-resistant sorghum which aligns with your water conservation goals, and 40% to organic specialty grains that command premium market prices. This approach reduces water usage by 25% while potentially increasing your profit margin by 15-18% compared to conventional monocropping.`,
          reasoning: "This balanced approach addresses both environmental sustainability and financial viability.",
          confidence: 0.91
        },
        {
          text: `The optimal strategy for your operation would be implementing a three-year rotation: Year 1: Organic spelt (high market value), Year 2: Legume cover crop (soil building), Year 3: Drought-resistant millet (water conservation). This rotation maximizes soil health benefits while capitalizing on premium markets, potentially increasing your 3-year revenue by 22% while reducing input costs by 15%.`,
          reasoning: "Long-term rotation strategy balances immediate profitability with building natural capital in your soil.",
          confidence: 0.93
        }
      ]
    };

    // Simple hashing of the prompt and context to select a consistent response
    const hash = this.hashString(JSON.stringify({ prompt, context }));
    const index = hash % responses[agentType].length;
    
    return responses[agentType][index];
  }

  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
}

// Create a singleton instance
const ollamaService = new OllamaService();
export default ollamaService;
