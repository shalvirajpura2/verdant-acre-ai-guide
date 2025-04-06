
import React from 'react';
import PageLayout from '@/components/layout/PageLayout';
import CoordinatorAgent from '@/components/agents/CoordinatorAgent';

const RecommendationsPage = () => {
  return (
    <PageLayout 
      title="Balanced Recommendations" 
      subtitle="Optimized suggestions that balance sustainability and profitability"
    >
      <CoordinatorAgent />
    </PageLayout>
  );
};

export default RecommendationsPage;
