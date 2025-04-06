
import React from "react";
import { Leaf, BarChart, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const NavBar = () => {
  const { toast } = useToast();

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-nature-light-green" />
          <span className="text-xl font-semibold">Verdant Acre</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link to="/farmer-advisor" className="text-foreground/80 hover:text-foreground transition-colors">
            Farmer Advisor
          </Link>
          <Link to="/market-researcher" className="text-foreground/80 hover:text-foreground transition-colors">
            Market Research
          </Link>
          <Link to="/recommendations" className="text-foreground/80 hover:text-foreground transition-colors">
            Recommendations
          </Link>
        </nav>
        
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => toast({
              title: "Analytics",
              description: "Analytics feature coming soon!",
            })}
          >
            <BarChart className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => toast({
              title: "Settings",
              description: "Settings feature coming soon!",
            })}
          >
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="default" size="sm" className="hidden md:flex">
            New Analysis
          </Button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
