
import React from 'react';
import Dashboard from './Dashboard';
import PageLayout from '@/components/layout/PageLayout';

const Index = () => {
  return (
    <PageLayout 
      title="Dashboard" 
      subtitle="Overview of your sustainable farming recommendations"
    >
      <Dashboard />
    </PageLayout>
  );
};

export default Index;
