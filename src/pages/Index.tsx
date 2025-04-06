
import React from 'react';
import Dashboard from './Dashboard';
import PageLayout from '@/components/layout/PageLayout';
import { TooltipProvider } from '@/components/ui/tooltip';

const Index = () => {
  return (
    <TooltipProvider>
      <PageLayout 
        title="Dashboard" 
        subtitle="Overview of your sustainable farming recommendations"
      >
        <Dashboard />
      </PageLayout>
    </TooltipProvider>
  );
};

export default Index;
