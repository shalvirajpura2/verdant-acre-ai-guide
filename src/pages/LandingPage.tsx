
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Leaf, Activity, Search, ArrowRight } from "lucide-react";
import UserGuide from '@/components/landing/UserGuide';
import LoginForm from '@/components/auth/LoginForm';
import { useToast } from '@/components/ui/use-toast';
import { TooltipProvider } from '@/components/ui/tooltip';

const LandingPage = () => {
  const { toast } = useToast();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulating authentication state
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email: string, password: string) => {
    // Simple mock authentication
    if (email && password) {
      localStorage.setItem('user', JSON.stringify({ email }));
      setIsLoggedIn(true);
      setShowLogin(false);
      toast({
        title: "Success",
        description: "You've successfully logged in!",
      });
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const navigateToDashboard = () => {
    if (!isLoggedIn) {
      setShowLogin(true);
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard",
      });
      return;
    }
  };

  return (
    <TooltipProvider>
      <div className="relative min-h-screen flex flex-col">
        {/* Animated background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-nature-pale-green to-nature-pastel-blue opacity-50"></div>
          
          {/* Animated leaves */}
          <div className="leaf-container">
            {[...Array(15)].map((_, i) => (
              <div 
                key={i} 
                className="absolute leaf"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${15 + Math.random() * 15}s`,
                  opacity: 0.4 + Math.random() * 0.3,
                  transform: `scale(${0.5 + Math.random()}) rotate(${Math.random() * 360}deg)`,
                }}
              >
                <Leaf size={16 + Math.random() * 16} className="text-nature-light-green" />
              </div>
            ))}
          </div>
        </div>

        {/* Header */}
        <header className="relative z-10 bg-background/80 backdrop-blur-sm border-b border-border/50 py-4">
          <div className="container mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-nature-light-green" />
              <span className="text-xl font-semibold">Verdant Acre</span>
            </div>
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard"><Button variant="outline" size="sm">Dashboard</Button></Link>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" onClick={() => setShowLogin(true)}>Login</Button>
                  <Button variant="outline" size="sm" onClick={() => setShowLogin(true)}>Sign Up</Button>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-grow container mx-auto px-4 py-12 relative z-10">
          {showLogin ? (
            <div className="max-w-md mx-auto">
              <div className="bg-background/90 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-border/50">
                <LoginForm onLogin={handleLogin} onCancel={() => setShowLogin(false)} />
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {/* Hero section */}
              <section className="text-center py-12">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-nature-light-green to-nature-pastel-blue bg-clip-text text-transparent">
                  Sustainable Farming AI System
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">
                  Balancing profitability and sustainability with AI-driven recommendations for modern farmers.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to={isLoggedIn ? "/dashboard" : "#"} onClick={navigateToDashboard}>
                    <Button size="lg" className="group">
                      Get Started
                      <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={() => {
                    document.getElementById('user-guide')?.scrollIntoView({ behavior: 'smooth' });
                  }}>
                    Learn More
                  </Button>
                </div>
              </section>

              {/* Features */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Leaf className="h-12 w-12 text-nature-light-green" />,
                    title: "Farmer Advisor",
                    description: "Get sustainable crop recommendations based on your land data, preferences, and goals."
                  },
                  {
                    icon: <Search className="h-12 w-12 text-nature-light-green" />,
                    title: "Market Researcher",
                    description: "Analyze current market trends and demand forecasts to maximize profitability."
                  },
                  {
                    icon: <Activity className="h-12 w-12 text-nature-light-green" />,
                    title: "Coordinator",
                    description: "Balance sustainability and profitability with optimized recommendations."
                  }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="bg-background/80 backdrop-blur-sm p-6 rounded-lg shadow-sm border border-border/50 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="mb-4 p-3 bg-primary/10 rounded-full">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </section>

              {/* User Guide */}
              <section id="user-guide" className="bg-background/80 backdrop-blur-sm p-8 rounded-lg shadow-md border border-border/50">
                <h2 className="text-3xl font-bold mb-6 text-center">User Guide</h2>
                <UserGuide />
              </section>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="relative z-10 bg-muted/30 py-6 border-t border-border/50 mt-12">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Verdant Acre — Sustainable Farming AI System</p>
          </div>
        </footer>
      </div>
    </TooltipProvider>
  );
};

export default LandingPage;
